
export interface TimeSeriesChartData {
  type: 'time-series';
  data: any[];
  keys: string[];
  title: string;
  xAxisKey: string;
}

export interface BarChartData {
    type: 'bar';
    data: any[];
    keys: string[];
    title: string;
    xAxisKey: string;
    yAxisLabel?: string;
}

export interface PieChartData {
    type: 'pie';
    data: { name: string; value: number }[];
    title: string;
}

export type ChartData = TimeSeriesChartData | BarChartData | PieChartData;

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  chartData?: ChartData;
}
