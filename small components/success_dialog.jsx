// SuccessDialog.js

import React, { useEffect, useRef } from "react";
import { FaCheck } from "react-icons/fa";
import "./success_dialog.css"; // Import CSS for dialog styling

const SuccessDialog = ({ onClose }) => {
  const dialogRef = useRef(null);

  // Add a useEffect hook to animate the dialog on mount
  useEffect(() => {
    const dialogElement = dialogRef.current;
    dialogElement.classList.add("show"); // Add class to show the dialog
    return () => {
      dialogElement.classList.remove("show"); // Remove class on unmount
    };
  }, []);

  return (
    <div ref={dialogRef} className="dialog">
      <div className="dialog-content">
        <div className="icon">
          <FaCheck />
        </div>
        <p className="message">Form submitted successfully!</p>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SuccessDialog;
