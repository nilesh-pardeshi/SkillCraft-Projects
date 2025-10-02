import React from 'react';

const Cell = ({ value, onClick, highlight }) => {
  return (
    <button 
      className={`cell ${highlight ? 'highlight' : ''}`} 
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Cell;
