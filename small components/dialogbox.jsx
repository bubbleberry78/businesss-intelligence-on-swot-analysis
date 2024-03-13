import React from 'react';
import './dialogbox.css';

const DialogBox = ({ onClose }) => {
  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <h2>Alert</h2>
        <p>Please sign in first.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default DialogBox;
