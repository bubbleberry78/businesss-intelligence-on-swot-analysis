// TrainingSuccessDialog.js

import React from "react";

const TrainingSuccessDialog = ({ onClose }) => {
  return (
    <div className="dialog">
      <div className="dialog-content">
        <p>Your model is trained successfully!</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TrainingSuccessDialog;
