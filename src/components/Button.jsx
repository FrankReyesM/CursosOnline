import React from 'react';
import { BUTTON_VARIANTS, BUTTON_SIZES } from '../utils/constants';

const Button = ({ 
  children, 
  onClick, 
  variant = BUTTON_VARIANTS.PRIMARY, 
  size = BUTTON_SIZES.MD, 
  disabled = false,
  className = '',
  type = 'button'
}) => {
  const baseClasses = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2';
  
  const variants = {
    [BUTTON_VARIANTS.PRIMARY]: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-300',
    [BUTTON_VARIANTS.SECONDARY]: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-300',
    [BUTTON_VARIANTS.DANGER]: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-300',
    [BUTTON_VARIANTS.SUCCESS]: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-300'
  };
  
  const sizes = {
    [BUTTON_SIZES.SM]: 'px-3 py-2 text-sm',
    [BUTTON_SIZES.MD]: 'px-4 py-2',
    [BUTTON_SIZES.LG]: 'px-6 py-3 text-lg'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;