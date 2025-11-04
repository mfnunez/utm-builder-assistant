
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ChartData } from '../types';

interface TimeSeriesChartProps {
  chartData: ChartData;
}

const COLORS = ['#3b82f6', '#22c55e', '#f97316', '#ec4899', '#8b5cf6', '#14b8a6'];

export function TimeSeriesChart({ chartData }: TimeSeriesChartProps) {
  const { data, keys, title, xAxisKey } = chartData;

  return (
    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
      <h3 className="text-base font-semibold text-white mb-4 text-center">{title}</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 5, right: 20, left: -5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis 
              dataKey={xAxisKey} 
              stroke="#9ca3af" 
              tick={{ fontSize: 12 }} 
              tickLine={{ stroke: "#9ca3af" }}
            />
            <YAxis 
              stroke="#9ca3af" 
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: "#9ca3af" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                borderColor: '#374151',
                color: '#e5e7eb',
              }}
              labelStyle={{ color: '#d1d5db', fontWeight: 'bold' }}
              itemStyle={{ fontWeight: 'normal' }}
            />
            <Legend wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }} />
            {keys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
