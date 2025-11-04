
import React, { useState } from 'react';
import { useGeminiChat } from './hooks/useGeminiChat';
import { ChatWindow } from './components/ChatWindow';
import { ChatInput } from './components/ChatInput';
import { BotIcon } from './components/icons';
import { SuggestedPrompts } from './components/SuggestedPrompts';

export default function App() {
  const [ga4Data, setGa4Data] = useState<any | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const { messages, isLoading, error, sendMessage } = useGeminiChat(ga4Data);

  const handleFileProcessed = (data: any, name: string) => {
    setGa4Data(data);
    setFileName(name);
  };

  const handleClearFile = () => {
    setGa4Data(null);
    setFileName(null);
  };

  const handlePromptClick = (prompt: string) => {
    if (!isLoading) {
      sendMessage(prompt);
    }
  };

  return (
    <main className="flex flex-col h-screen bg-gray-900 text-white font-sans">
      <header className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 p-4 shadow-lg z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
            <BotIcon className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Analyse de Campagne IA</h1>
            <p className="text-sm text-gray-300">Votre expert en acquisition de données GA4</p>
          </div>
        </div>
      </header>
      
      <div className="flex-1 flex flex-col w-full max-w-4xl mx-auto overflow-hidden">
        {messages.length === 1 && (
          <SuggestedPrompts onPromptClick={handlePromptClick} disabled={isLoading} />
        )}
        {messages.length > 1 && <ChatWindow messages={messages} />}
        
        <div className="mt-auto">
          {error && <div className="px-6 pb-2 text-red-400 text-sm text-center">{error}</div>}
          <ChatInput 
            onSendMessage={sendMessage} 
            isLoading={isLoading}
            onFileProcessed={handleFileProcessed}
            onClearFile={handleClearFile}
            fileName={fileName}
          />
        </div>
      </div>
    </main>
  );
}
