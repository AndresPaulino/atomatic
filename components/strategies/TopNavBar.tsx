'use client';

import React from 'react';
import { Node, Edge } from 'react-flow-renderer';
import { Save, Upload, Menu } from 'lucide-react';

interface TopNavBarProps {
  nodes: Node[];
  edges: Edge[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  toggleDrawer: () => void;
}

const TopNavBar: React.FC<TopNavBarProps> = ({ nodes, edges, setNodes, setEdges, toggleDrawer }) => {
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
    <nav className='bg-white dark:bg-gray-800 shadow-md p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <button
            onClick={toggleDrawer}
            className='mr-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
          >
            <Menu size={24} />
          </button>
          <h1 className='text-xl font-bold text-gray-800 dark:text-gray-200'>Algorithmic Strategy Builder</h1>
        </div>
        <div className='flex items-center space-x-4'>
          <button
            onClick={saveStrategy}
            className='flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
          >
            <Save className='mr-2' size={20} />
            Save
          </button>
          <label className='flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors cursor-pointer'>
            <Upload className='mr-2' size={20} />
            Load
            <input type='file' onChange={loadStrategy} className='hidden' accept='.json' />
          </label>
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
