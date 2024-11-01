import React, { memo, useState } from 'react';
import { Handle, Position, NodeProps } from 'react-flow-renderer';
import { nodeTypes, indicatorOptions, conditionOptions, actionOptions, exitOptions } from '@/lib/nodeTypes';
import { Plus, Minus } from 'lucide-react';

const CustomNode = ({ data, isConnectable }: NodeProps) => {
  const { label, type } = data;
  const { icon: Icon, color, borderColor } = nodeTypes[type as keyof typeof nodeTypes];
  const [options, setOptions] = useState([0]);

  const addOption = () => {
    setOptions([...options, options.length]);
  };

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const renderNodeContent = (index: number) => {
    switch (type) {
      case 'asset':
        return (
          <input
            key={index}
            type='text'
            placeholder='Enter stock symbol'
            className='mt-2 p-1 w-full text-sm border rounded'
            onChange={(e) => console.log(`Asset symbol ${index}:`, e.target.value)}
          />
        );
      case 'indicator':
        return (
          <select
            key={index}
            className='mt-2 p-1 w-full text-sm border rounded'
            onChange={(e) => console.log(`Selected indicator ${index}:`, e.target.value)}
          >
            <option value=''>Select an indicator</option>
            {indicatorOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'condition':
        return (
          <select
            key={index}
            className='mt-2 p-1 w-full text-sm border rounded'
            onChange={(e) => console.log(`Selected condition ${index}:`, e.target.value)}
          >
            <option value=''>Select a condition</option>
            {conditionOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'action':
        return (
          <select
            key={index}
            className='mt-2 p-1 w-full text-sm border rounded'
            onChange={(e) => console.log(`Selected action ${index}:`, e.target.value)}
          >
            <option value=''>Select an action</option>
            {actionOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'exit':
        return (
          <select
            key={index}
            className='mt-2 p-1 w-full text-sm border rounded'
            onChange={(e) => console.log(`Selected exit strategy ${index}:`, e.target.value)}
          >
            <option value=''>Select exit strategy</option>
            {exitOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`px-4 py-2 shadow-md rounded-md ${color} ${borderColor} border-2`}>
      <Handle
        type='target'
        position={Position.Top}
        isConnectable={isConnectable}
        className={`w-16 h-16 ${type === 'asset' ? 'hidden' : ''}`}
      />
      <div className='flex items-center justify-between mb-2'>
        <div className='flex items-center'>
          <Icon className='mr-2' size={24} />
          <div className='text-sm font-medium'>{label}</div>
        </div>
        <button
          onClick={addOption}
          className='p-1 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'
        >
          <Plus size={16} />
        </button>
      </div>
      {options.map((_, index) => (
        <div key={index} className='flex items-center mb-2'>
          {renderNodeContent(index)}
          {index > 0 && (
            <button
              onClick={() => removeOption(index)}
              className='ml-2 p-1 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'
            >
              <Minus size={16} />
            </button>
          )}
        </div>
      ))}
      {type !== 'exit' && (
        <Handle 
          type='source' 
          position={Position.Bottom} 
          isConnectable={isConnectable}
          className='w-16 h-16'
        />
      )}
    </div>
  );
};

export default memo(CustomNode);
