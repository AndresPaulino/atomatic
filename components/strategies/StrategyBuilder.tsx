// components/strategies/StrategyBuilder.tsx

'use client';

import React, { useState, useCallback, useEffect } from 'react';
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
import { useToast } from '@/components/ui/use-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import NodeLibrary from './NodeLibrary';
import CustomNode from './CustomNode';
import TopNavBar from './TopNavBar';
import { SaveStrategyModal } from './SaveStrategyModal';
import { StrategyService, StrategyNode } from '@/services/strategyService';
import { generateNode } from '@/lib/nodeGenerator';
import { isValidConnection } from '@/lib/connectionRules';

const customNodeTypes = {
  customNode: CustomNode,
};

const StrategyBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const strategyId = searchParams.get('id');

  // Load existing strategy if ID is provided
  useEffect(() => {
    const loadStrategy = async () => {
      if (!strategyId) return;

      try {
        setIsLoading(true);
        const { nodes: loadedNodes, edges: loadedEdges } = await StrategyService.loadStrategy(Number(strategyId));
        setNodes(loadedNodes);
        setEdges(loadedEdges);
      } catch (error) {
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : 'Failed to load strategy',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadStrategy();
  }, [strategyId, setNodes, setEdges, toast]);

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

      if (!reactFlowInstance) return;
      const type = event.dataTransfer.getData('application/reactflow');
      const position = reactFlowInstance.project({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = generateNode(type, position);
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const handleSaveStrategy = async (name: string, description: string) => {
    try {
      const savedStrategy = await StrategyService.saveStrategy(nodes as StrategyNode[], edges, name, description);
      router.push(`/strategies/edit?id=${savedStrategy.id}`);
    } catch (error) {
      throw error;
    }
  };

  const validateStrategy = () => {
    // Check if there are any nodes
    if (nodes.length === 0) {
      throw new Error('Strategy must contain at least one node');
    }

    // Check if there's at least one asset node
    const hasAsset = nodes.some((node) => node.data.type === 'asset');
    if (!hasAsset) {
      throw new Error('Strategy must contain at least one asset node');
    }

    // Check if there's at least one action or exit node
    const hasActionOrExit = nodes.some((node) => node.data.type === 'action' || node.data.type === 'exit');
    if (!hasActionOrExit) {
      throw new Error('Strategy must contain at least one action or exit node');
    }

    // Check if all nodes are connected
    const isConnected = edges.length >= nodes.length - 1;
    if (!isConnected) {
      throw new Error('All nodes must be connected');
    }
  };

  const handleSave = () => {
    try {
      validateStrategy();
      setIsSaveModalOpen(true);
    } catch (error) {
      toast({
        title: 'Validation Error',
        description: error instanceof Error ? error.message : 'Invalid strategy configuration',
        variant: 'destructive',
      });
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  if (isLoading) {
    return <div className='flex items-center justify-center h-screen'>Loading...</div>;
  }

  return (
    <div className='flex flex-col h-screen'>
      <TopNavBar
        nodes={nodes}
        edges={edges}
        setNodes={setNodes}
        setEdges={setEdges}
        toggleDrawer={toggleDrawer}
        onSave={handleSave}
      />
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
              onInit={setReactFlowInstance}
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
      <SaveStrategyModal isOpen={isSaveModalOpen} onClose={() => setIsSaveModalOpen(false)} onSave={handleSaveStrategy} />
    </div>
  );
};

export default StrategyBuilder;
