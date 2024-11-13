// components/strategies/TopNavBar.tsx

'use client';

import React from 'react';
import { Node, Edge } from 'react-flow-renderer';
import { Save, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TopNavBarProps {
  nodes: Node[];
  edges: Edge[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  toggleDrawer: () => void;
  onSave: () => void;
}

const TopNavBar: React.FC<TopNavBarProps> = ({ toggleDrawer, onSave }) => {
  return (
    <nav className='bg-white dark:bg-gray-800 shadow-md p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <Button variant='ghost' size='icon' onClick={toggleDrawer} className='mr-4'>
            <Menu className='h-5 w-5' />
          </Button>
          <h1 className='text-xl font-bold text-gray-800 dark:text-gray-200'>Algorithmic Strategy Builder</h1>
        </div>
        <div className='flex items-center space-x-4'>
          <Button onClick={onSave} className='flex items-center'>
            <Save className='mr-2 h-5 w-5' />
            Save Strategy
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
