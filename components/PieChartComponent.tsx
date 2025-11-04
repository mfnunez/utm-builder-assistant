
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { PieChartData } from '../types';

interface PieChartComponentProps {
  chartData: PieChartData;
}

const COLORS = ['#3b82f6', '#10b981', '#f97316', '#ec4899', '#8b5cf6', '#f59e0b', '#6366f1', '#14b8a6'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.05) return null;

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={12}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function PieChartComponent({ chartData }: PieChartComponentProps) {
  const { data, title } = chartData;

  return (
    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
      <h3 className="text-base font-semibold text-white mb-4 text-center">{title}</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={110}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                borderColor: '#374151',
                color: '#e5e7eb',
              }}
              formatter={(value: number, name: string) => [value, name]}
            />
            <Legend wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
