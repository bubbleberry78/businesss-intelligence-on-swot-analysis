import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faEraser,
  faSave,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import "./Whiteboard.css";

const MyWhiteboard = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedTool, setSelectedTool] = useState("pen"); // 'pen' or 'eraser'
  const [prevPos, setPrevPos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  const [showShareOptions, setShowShareOptions] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const handleMouseDown = (e) => {
      setIsDrawing(true);
      setPrevPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e) => {
      if (!isDrawing) return;

      const currentPos = { x: e.clientX, y: e.clientY };

      draw(prevPos, currentPos);

      setPrevPos(currentPos);
    };

    const handleMouseUp = () => {
      setIsDrawing(false);
    };

    const draw = (start, end) => {
      const tool = selectedTool === "pen" ? "black" : "white";
      const size = selectedTool === "pen" ? 2 : 10;

      ctx.beginPath();
      ctx.strokeStyle = tool;
      ctx.lineWidth = size;
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDrawing, prevPos, selectedTool]);

  useEffect(() => {
    canvasRef.current.style.cursor =
      selectedTool === "pen"
        ? "crosshair"
        : "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICA8cGF0aCBkPSJNMTYuOTggMTEuNDloMi44OXYxMS45OG0wLjA1IDEuMjhMOSA4LjA1IDIuODkgMTYuOTggNy4wNSAyLjg5IDIuODkgMTYuOTggMTYuOTggNy4wNSAxNi45OCAyLjg5IDIuODljMCAxLjMyLTEuMDcgMi45Mi0yLjgyIDIuODktMi44OSAxLjg2IDAgMi4yNy0uNzcgMi44OS0xLjQ5IDAtMi4wNyAxLjA4LTIuMjcgMi44OS0yLjg5aDIuNjJ6Ii8+Cjwvc3ZnPgo=) 0 16, auto";
  }, [selectedTool]);

  const handleToolSelect = (tool) => {
    setSelectedTool(tool);
  };
  const handleSaveImage = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png");
    setImageUrl(image);
  };

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };

  const handleShareOptionClick = (option) => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL('image/png');

    // Copy image URL to clipboard
    navigator.clipboard.writeText(image)
      .then(() => {
        console.log('Image URL copied to clipboard');
        alert('Image copied successfully! ✔️');
      })
      .catch((error) => {
        console.error('Failed to copy image URL to clipboard:', error);
      });
    };

  return (
    <div className="board-container">
      <div className="toolbar">
        <button onClick={() => handleToolSelect("pen")}>
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button onClick={() => handleToolSelect("eraser")}>
          <FontAwesomeIcon icon={faEraser} />
        </button>
        <button onClick={handleSaveImage}>
          <FontAwesomeIcon icon={faSave} />
        </button>
        <button onClick={toggleShareOptions}>
          <FontAwesomeIcon icon={faShare} />
        </button>
        {showShareOptions && (
          <div className="share-options">
            
            <button onClick={() => handleShareOptionClick("copy")}>
              Copy link to clipboard
            </button>
          </div>
        )}
      </div>
      <canvas ref={canvasRef} width={1000} height={800}></canvas>
    </div>
  );
};

export default MyWhiteboard;
