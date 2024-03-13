import React from 'react';

const Toolbox = ({ onSelectTool }) => {
  const handleToolSelect = (tool) => {
    onSelectTool(tool);
  };

  return (
    <div>
      <button onClick={() => handleToolSelect('pen')}>Pen</button>
      <button onClick={() => handleToolSelect('eraser')}>Eraser</button>
      {/* Add more buttons for other drawing tools */}
    </div>
  );
};

export default Toolbox;