import {Position} from 'react-flow-renderer';

export const initialNodes = [
  { id: 'node-1A',
    type: 'CustomNode',
    position: { x: 0, y: -100 },
    data: {
      type: 'source',
      label: 'Node A',
      edgePosition: Position.Right
    }},
  { id: 'node-2B',
    type: 'CustomNode',
    position: { x: 250, y: -100 },
    data: {
      type: 'target',
      label: 'Node B',
      edgePosition: Position.Left,
      notConnectable: true
    }},
];