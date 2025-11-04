
import React, { useState, useRef, useEffect } from 'react';
import { SendIcon, PaperClipIcon, XCircleIcon } from './icons';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  onFileProcessed: (data: any, name: string) => void;
  onClearFile: () => void;
  fileName: string | null;
}

export function ChatInput({ onSendMessage, isLoading, onFileProcessed, onClearFile, fileName }: ChatInputProps) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const result = event.target?.result;
          if (typeof result === 'string') {
            const jsonData = JSON.parse(result);
            onFileProcessed(jsonData, file.name);
          }
        } catch (error) {
          console.error("Error parsing JSON file:", error);
          alert("Fichier JSON invalide.");
        }
      };
      reader.readAsText(file);
    }
    // Reset file input to allow re-uploading the same file
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-gray-900/70 backdrop-blur-sm border-t border-gray-700 p-4">
      <div className="max-w-4xl mx-auto">
        {fileName && (
          <div className="mb-2 flex items-center justify-between text-sm bg-gray-700/50 px-3 py-1.5 rounded-md">
            <span className="text-gray-300 truncate">Fichier chargé : <span className="font-medium text-white">{fileName}</span></span>
            <button onClick={onClearFile} className="text-gray-400 hover:text-white transition-colors">
              <XCircleIcon className="w-5 h-5" />
            </button>
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex items-center gap-4">
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
            aria-hidden="true"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="text-gray-400 hover:text-white disabled:text-gray-600 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg p-2.5"
            aria-label="Attach file"
          >
            <PaperClipIcon className="w-5 h-5" />
          </button>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={fileName ? "Posez une question sur vos données..." : "Chargez un fichier et posez une question..."}
            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            disabled={isLoading}
            aria-label="Chat input"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 text-white rounded-lg p-2.5 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            aria-label="Send message"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <SendIcon />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
