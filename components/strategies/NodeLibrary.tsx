import React from 'react';
import { nodeTypes } from '@/lib/nodeTypes';

interface NodeLibraryProps {
  isOpen: boolean;
}

const NodeLibrary: React.FC<NodeLibraryProps> = ({ isOpen }) => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className={`bg-white dark:bg-gray-800 p-4 overflow-y-auto transition-all duration-300 ${isOpen ? 'w-64' : 'w-0'}`}>
      {isOpen && (
        <>
          <h2 className='text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200'>Node Library</h2>
          {Object.entries(nodeTypes).map(([type, { label, icon: Icon, color }]) => (
            <div
              key={type}
              className={`flex items-center p-2 mb-2 rounded cursor-move hover:opacity-80 transition-colors ${color}`}
              onDragStart={(event) => onDragStart(event, type)}
              draggable
            >
              <Icon className='mr-2 text-gray-600 dark:text-gray-300' size={20} />
              <span className='text-gray-800 dark:text-gray-200'>{label}</span>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default NodeLibrary;
