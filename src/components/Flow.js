import {useCallback, useRef, useState} from 'react';
import ReactFlow, {addEdge, applyEdgeChanges, applyNodeChanges, MarkerType, Position} from 'react-flow-renderer';

import CustomNode from './CustomNode.js';

import '../App.css';
import {Box, Button} from "@mui/material";
import {initialNodes} from "./initialElements";

const rfStyle = {
  backgroundColor: '#B8CEFF',
};

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { CustomNode };

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);
  const [nodeCounter, setNodeCounter] = useState(2)
  const yARef = useRef(-100)
  const yBRef = useRef(-100)

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges({
      ...changes,
      animated: true,
    }, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) =>
      connection.source.includes('A') ? setEdges((eds) => addEdge({
          ...connection,
          animated: true,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        }, eds)) :
        setEdges(edges),
    [setEdges]
  );
  const handleAddNodeA = () => {
    yARef.current += 50;
    setNodes([
      ...nodes,
      {
        id: `node-${nodeCounter+1}A`,
        type: 'CustomNode',
        position: { x: 0, y: yARef.current },
        data: {
          type: 'source',
          label: 'Node A',
          edgePosition: Position.Right
        }
      }
    ])
    setNodeCounter(nodeCounter+1)
  }
  const handleAddNodeB = () => {
    yBRef.current += 50;
    setNodes([
      ...nodes,
      {
        id: `node-${nodeCounter+1}B`,
        type: 'CustomNode',
        position: { x: 250, y: yBRef.current },
        data: {
          type: 'target',
          label: 'Node B',
          notConnectable: true,
          edgePosition: Position.Left
        }
      }
    ])
    setNodeCounter(nodeCounter+1)
  }

  return (
    <Box sx={{width: '100%', height: 300}}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        style={rfStyle}
      />
      <Box mt={2}>
        <Button onClick={handleAddNodeA}>Add Node A</Button>
        <Button onClick={handleAddNodeB}>Add Node B</Button>
      </Box>
    </Box>
  );
}

export default Flow;
