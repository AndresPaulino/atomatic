'use client';

import React from 'react';
import { Node, Edge } from 'react-flow-renderer';
import { Save, Upload } from 'lucide-react';

interface SaveLoadPanelProps {
  nodes: Node[];
  edges: Edge[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
}

const SaveLoadPanel: React.FC<SaveLoadPanelProps> = ({ nodes, edges, setNodes, setEdges }) => {
  const saveStrategy = () => {
    const strategy = JSON.stringify({ nodes, edges });
    const blob = new Blob([strategy], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'strategy.json';
    link.click();
  };

  const loadStrategy = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const { nodes: loadedNodes, edges: loadedEdges } = JSON.parse(content);
        setNodes(loadedNodes);
        setEdges(loadedEdges);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className='w-64 bg-white dark:bg-gray-800 p-4'>
      <h2 className='text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200'>Save/Load</h2>
      <button
        onClick={saveStrategy}
        className='flex items-center justify-center w-full mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
      >
        <Save className='mr-2' size={20} />
        Save Strategy
      </button>
      <label className='flex items-center justify-center w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors cursor-pointer'>
        <Upload className='mr-2' size={20} />
        Load Strategy
        <input type='file' onChange={loadStrategy} className='hidden' accept='.json' />
      </label>
    </div>
  );
};

export default SaveLoadPanel;
