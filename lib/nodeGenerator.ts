import { Node, XYPosition } from 'react-flow-renderer';
import { nodeTypes } from './nodeTypes';

let id = 0;

export const generateNode = (type: string, position: XYPosition): Node => {
  const nodeType = nodeTypes[type as keyof typeof nodeTypes];

  return {
    id: `${type}-${id++}`,
    type: 'customNode',
    position,
    data: { label: nodeType.label, type },
  };
};
