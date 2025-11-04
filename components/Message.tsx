
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message as MessageType } from '../types';
import { BotIcon, UserIcon } from './icons';
import { TimeSeriesChart } from './TimeSeriesChart';
import { BarChartComponent } from './BarChartComponent';
import { PieChartComponent } from './PieChartComponent';

interface MessageProps {
  message: MessageType;
}

export function Message({ message }: MessageProps) {
  const isModel = message.role === 'model';

  return (
    <div className={`flex items-start gap-4 ${!isModel ? 'flex-row-reverse' : ''}`}>
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
        {isModel ? <BotIcon className="w-6 h-6 text-blue-400" /> : <UserIcon className="w-6 h-6 text-gray-400" />}
      </div>
      
      <div 
        className={`rounded-lg p-4 max-w-xl lg:max-w-3xl break-words shadow-md ${
          isModel 
            ? 'bg-gray-800 text-gray-200' 
            : 'bg-blue-600 text-white'
        }`}
      >
        {message.chartData && (
          <div className="mb-4">
            {message.chartData.type === 'time-series' && <TimeSeriesChart chartData={message.chartData} />}
            {message.chartData.type === 'bar' && <BarChartComponent chartData={message.chartData} />}
            {message.chartData.type === 'pie' && <PieChartComponent chartData={message.chartData} />}
          </div>
        )}
        <div className={`prose prose-sm max-w-none ${isModel ? 'prose-invert' : 'prose-white'}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
