
import { useState, useRef, useCallback } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from '@google/genai';
import type { Message } from '../types';

const API_KEY = process.env.API_KEY as string;

const SYSTEM_INSTRUCTION = `Vous êtes un expert en analyse de campagnes marketing et en Google Analytics 4 (GA4). Votre rôle est de répondre aux questions concernant les canaux d'acquisition, l'interprétation des données et les meilleures pratiques.

Les données JSON de GA4 vous seront fournies avec la question de l'utilisateur.

Lorsque vous devez visualiser des données, choisissez le type de graphique le plus approprié (série temporelle, barres, ou camembert) et répondez UNIQUEMENT avec un objet JSON valide qui suit l'un des schémas ci-dessous. N'ajoutez aucun texte, commentaire ou démarqueur de code avant ou après le JSON.

**1. Schéma pour Série Temporelle (time-series):**
Utilisez pour montrer une métrique au fil du temps.
{
  "chart": {
    "type": "time-series",
    "title": "Titre du graphique",
    "xAxisKey": "la_cle_pour_l_axe_x (ex: 'date')",
    "keys": ["cle_metrique_1", "cle_metrique_2"],
    "data": [
      { "date": "2023-01-01", "cle_metrique_1": 100, "cle_metrique_2": 200 },
      { "date": "2023-01-02", "cle_metrique_1": 120, "cle_metrique_2": 210 }
    ]
  },
  "summary": "Un résumé textuel et une analyse de ce que le graphique montre. Vous pouvez utiliser Markdown."
}

**2. Schéma pour Graphique à Barres (bar):**
Utilisez pour comparer des métriques entre différentes catégories (ex: sessions par canal).
{
  "chart": {
    "type": "bar",
    "title": "Titre du graphique",
    "xAxisKey": "la_cle_pour_la_categorie (ex: 'canal')",
    "keys": ["cle_metrique_1", "cle_metrique_2"],
    "yAxisLabel": "Libellé de l'axe Y (ex: 'Sessions')",
    "data": [
      { "canal": "Organique", "sessions": 500, "conversions": 50 },
      { "canal": "Payant", "sessions": 800, "conversions": 75 }
    ]
  },
  "summary": "Un résumé textuel et une analyse de ce que le graphique montre. Vous pouvez utiliser Markdown."
}

**3. Schéma pour Graphique Camembert (pie):**
Utilisez pour montrer la proportion d'une seule métrique par catégorie.
{
  "chart": {
    "type": "pie",
    "title": "Titre du graphique",
    "data": [
      { "name": "Organique", "value": 500 },
      { "name": "Payant", "value": 800 },
      { "name": "Direct", "value": 300 }
    ]
  },
  "summary": "Un résumé textuel et une analyse de ce que le graphique montre. Vous pouvez utiliser Markdown."
}

Pour toutes les autres questions qui ne nécessitent pas de visualisation, répondez normalement en texte clair (en utilisant Markdown si nécessaire).`;

export function useGeminiChat(ga4Data: any | null) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial-message',
      role: 'model',
      text: "Bonjour ! Je suis votre assistant d'analyse de campagnes. Chargez un fichier de données GA4 (JSON) et posez une question pour commencer.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chatRef = useRef<Chat | null>(null);

  const initializeChat = useCallback(() => {
    try {
      if (!API_KEY) {
        throw new Error("API_KEY is not configured.");
      }
      const ai = new GoogleGenAI({ apiKey: API_KEY, vertexai: true });
      chatRef.current = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });
    } catch (e) {
      console.error(e);
      setError('Failed to initialize the AI model. Please check the API key and configuration.');
    }
  }, []);

  if (!chatRef.current) {
    initializeChat();
  }

  const sendMessage = useCallback(async (userMessage: string) => {
    if (!userMessage.trim() || !chatRef.current) return;

    setIsLoading(true);
    setError(null);

    const newUserMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: userMessage,
    };
    setMessages(prev => [...prev, newUserMessage]);

    const dataContext = ga4Data 
      ? `Voici les données GA4 à analyser:\n\n\`\`\`json\n${JSON.stringify(ga4Data, null, 2)}\n\`\`\`\n\n`
      : 'Aucune donnée fournie. Répondez en vous basant sur des connaissances générales sur GA4.';
    
    const fullPrompt = `${dataContext}Question de l'utilisateur: ${userMessage}`;

    try {
      const response: GenerateContentResponse = await chatRef.current.sendMessage({ message: fullPrompt });
      const responseText = response.text;
      
      let parsedResponse;
      try {
        const cleanedText = responseText.trim().replace(/^```json\n?/, '').replace(/\n?```$/, '');
        parsedResponse = JSON.parse(cleanedText);
      } catch (e) {
        // Not a JSON response, treat as plain text
      }

      const botMessageId = `model-${Date.now()}`;
      if (parsedResponse && parsedResponse.chart && parsedResponse.summary) {
        const newBotMessage: Message = {
          id: botMessageId,
          role: 'model',
          text: parsedResponse.summary,
          chartData: parsedResponse.chart,
        };
        setMessages(prev => [...prev, newBotMessage]);
      } else {
        const newBotMessage: Message = {
          id: botMessageId,
          role: 'model',
          text: responseText,
        };
        setMessages(prev => [...prev, newBotMessage]);
      }

    } catch (e) {
      console.error(e);
      const errorMessage = 'Désolé, une erreur est survenue. Veuillez réessayer.';
      setError(errorMessage);
      const errorBotMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'model',
        text: errorMessage,
      };
      setMessages(prev => [...prev, errorBotMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [chatRef.current, ga4Data]);

  return { messages, isLoading, error, sendMessage };
}
