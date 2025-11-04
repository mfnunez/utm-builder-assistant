
import React, { useEffect, useRef } from 'react';
import { Message as MessageType } from '../types';
import { Message } from './Message';

interface ChatWindowProps {
  messages: MessageType[];
}

export function ChatWindow({ messages }: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
      {messages.map((msg) => (
        <Message key={msg.id} message={msg} />
      ))}
    </div>
  );
}
