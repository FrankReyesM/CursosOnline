import React from 'react';

const Title = ({ children, className = '' }) => (
  <h1 className={`text-3xl font-bold text-gray-800 mb-6 ${className}`}>
    {children}
  </h1>
);

export default Title;
