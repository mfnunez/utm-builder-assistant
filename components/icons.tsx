
import React from 'react';

export const BotIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M4.5 3.75a3 3 0 00-3 3v10.5a3 3 0 003 3h15a3 3 0 003-3V6.75a3 3 0 00-3-3h-15zm4.125 3a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm7.5 0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12 12.75a.75.75 0 00-.75.75v2.25a.75.75 0 001.5 0v-2.25a.75.75 0 00-.75-.75z"
      clipRule="evenodd"
    />
  </svg>
);

export const UserIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
      clipRule="evenodd"
    />
  </svg>
);

export const SendIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className || "w-5 h-5"}
    aria-hidden="true"
  >
    <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.949a.75.75 0 00.95.574l3.908-.977a.75.75 0 010 1.45l-3.908-.977a.75.75 0 00-.95.574l-1.414 4.949a.75.75 0 00.826.95l14.25-5.25a.75.75 0 000-1.395L3.105 2.289z" />
  </svg>
);

export const PaperClipIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="currentColor" 
    className={className || "w-5 h-5"}
    aria-hidden="true"
  >
    <path fillRule="evenodd" d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.364 6.364l-3.182 3.182a.75.75 0 01-1.06-1.061l3.182-3.182a3 3 0 00-4.242-4.243l-7 7a1.5 1.5 0 002.121 2.121l7-7a.75.75 0 011.06 1.06l-7 7a3 3 0 01-4.243-4.242l7-7a1.5 1.5 0 012.121 2.121l-7 7a.75.75 0 11-1.06-1.06l3.182-3.182a.75.75 0 011.061 1.06l-3.182 3.182z" clipRule="evenodd" />
  </svg>
);

export const XCircleIcon = ({ className }: { className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 20 20" 
        fill="currentColor" 
        className={className || "w-5 h-5"}
        aria-hidden="true"
    >
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
    </svg>
);

export const ChartBarIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="currentColor" 
    className={className || "w-5 h-5"}
    aria-hidden="true"
  >
    <path d="M12 2.5a.75.75 0 01.75.75v12.5a.75.75 0 01-1.5 0V3.25A.75.75 0 0112 2.5zM8 6a.75.75 0 01.75.75v8.5a.75.75 0 01-1.5 0V6.75A.75.75 0 018 6zM4 9a.75.75 0 01.75.75v5.5a.75.75 0 01-1.5 0v-5.5A.75.75 0 014 9zM16 5a.75.75 0 01.75.75v10.5a.75.75 0 01-1.5 0V5.75A.75.75 0 0116 5z" />
  </svg>
);
