import { Connection, Node } from 'react-flow-renderer';

const connectionRules: Record<string, string[]> = {
  asset: ['indicator'],
  indicator: ['condition'],
  condition: ['action'],
  action: ['exit'],
  exit: [],
};

export const isValidConnection = (connection: Connection, nodes: Node[]): boolean => {
  const sourceNode = nodes.find((node) => node.id === connection.source);
  const targetNode = nodes.find((node) => node.id === connection.target);

  if (!sourceNode || !targetNode) return false;

  const sourceType = sourceNode.data.type;
  const targetType = targetNode.data.type;

  return connectionRules[sourceType]?.includes(targetType) || false;
};

export const getValidTargetTypes = (sourceType: string): string[] => {
  return connectionRules[sourceType] || [];
};
