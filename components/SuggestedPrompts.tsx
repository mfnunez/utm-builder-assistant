
import React from 'react';
import { ChartBarIcon } from './icons';

interface SuggestedPromptsProps {
  onPromptClick: (prompt: string) => void;
  disabled: boolean;
}

export function SuggestedPrompts({ onPromptClick, disabled }: SuggestedPromptsProps) {
  const prompts = [
    "Montre-moi l'évolution des sessions par jour.",
    "Compare les sessions par canal d'acquisition.",
    "Quelle est la répartition des utilisateurs par pays ?",
    "Donne-moi un résumé des performances globales.",
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md">
        <h2 className="text-2xl font-bold text-white mb-2">Comment puis-je vous aider ?</h2>
        <p className="text-gray-400 mb-8">Chargez un fichier de données GA4 et essayez l'une de ces questions pour commencer.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {prompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => onPromptClick(prompt)}
              disabled={disabled}
              className="p-4 bg-gray-800/70 border border-gray-700 rounded-lg text-left hover:bg-gray-700/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-start gap-3">
                <ChartBarIcon className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-200 text-sm">{prompt}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
