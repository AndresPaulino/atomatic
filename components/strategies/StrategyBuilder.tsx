'use client';

import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  ReactFlowProvider,
  ReactFlowInstance,
} from 'react-flow-renderer';
import NodeLibrary from './NodeLibrary';
import CustomNode from './CustomNode';
import TopNavBar from './TopNavBar';
import { generateNode } from '@/lib/nodeGenerator';
import { isValidConnection } from '@/lib/connectionRules';
import { useToast } from '@/components/ui/use-toast';

const customNodeTypes = {
  customNode: CustomNode,
};

const StrategyBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const { toast } = useToast();

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      if (isValidConnection(params as Connection, nodes)) {
        setEdges((eds) => addEdge(params, eds));
      } else {
        toast({
          title: 'Invalid Connection',
          description: 'This connection is not allowed based on the node types.',
          variant: 'destructive',
        });
      }
    },
    [setEdges, nodes, toast]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (reactFlowInstance) {
        const type = event.dataTransfer.getData('application/reactflow');
        const position = {
          x: event.clientX,
          y: event.clientY - 40,
        };

        const newNode = generateNode(type, position);
        setNodes((nds) => nds.concat(newNode));
      }
    },
    [reactFlowInstance, setNodes]
  );

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className='flex flex-col h-screen'>
      <TopNavBar nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} toggleDrawer={toggleDrawer} />
      <div className='flex flex-grow overflow-hidden'>
        <NodeLibrary isOpen={isDrawerOpen} />
        <ReactFlowProvider>
          <div className='flex-grow'>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={(instance: ReactFlowInstance) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                setReactFlowInstance(instance as any);
              }}
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={customNodeTypes}
              fitView
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default StrategyBuilder;
