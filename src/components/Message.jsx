import React from 'react';
import { MESSAGE_TYPES } from '../utils/constants';

const Message = ({ type = MESSAGE_TYPES.INFO, children, onClose }) => {
  const types = {
    [MESSAGE_TYPES.SUCCESS]: 'bg-green-100 border-green-400 text-green-700',
    [MESSAGE_TYPES.ERROR]: 'bg-red-100 border-red-400 text-red-700',
    [MESSAGE_TYPES.WARNING]: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    [MESSAGE_TYPES.INFO]: 'bg-blue-100 border-blue-400 text-blue-700'
  };

  return (
    <div className={`border-l-4 p-4 mb-4 rounded ${types[type]}`}>
      <div className="flex justify-between items-center">
        <p>{children}</p>
        {onClose && (
          <button onClick={onClose} className="text-xl font-bold ml-4 hover:text-gray-600">
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default Message;