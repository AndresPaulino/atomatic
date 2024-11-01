import { DollarSign, Activity, AlertTriangle, Play, LogOut } from 'lucide-react';

export const nodeTypes = {
  asset: {
    label: 'Asset',
    icon: DollarSign,
    color: 'bg-green-100 dark:bg-green-900',
    borderColor: 'border-green-500',
  },
  indicator: {
    label: 'Indicator',
    icon: Activity,
    color: 'bg-purple-100 dark:bg-purple-900',
    borderColor: 'border-purple-500',
  },
  condition: {
    label: 'Condition',
    icon: AlertTriangle,
    color: 'bg-yellow-100 dark:bg-yellow-900',
    borderColor: 'border-yellow-500',
  },
  action: {
    label: 'Action',
    icon: Play,
    color: 'bg-red-100 dark:bg-red-900',
    borderColor: 'border-red-500',
  },
  exit: {
    label: 'Exit',
    icon: LogOut,
    color: 'bg-blue-100 dark:bg-blue-900',
    borderColor: 'border-blue-500',
  },
};

export const indicatorOptions = ['Moving Average', 'RSI', 'MACD', 'Bollinger Bands'];
export const conditionOptions = ['Greater Than', 'Less Than', 'Equal To', 'Between'];
export const actionOptions = ['Buy', 'Sell', 'Short'];
export const exitOptions = ['Stop Loss', 'Take Profit'];
