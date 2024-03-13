import React, { useState, useEffect } from "react";
import "./model_training.css";

const Model_training = () => {
  const [file, setFile] = useState(null);
  const [cleaningStatus, setCleaningStatus] = useState("");
  const [trainingStatus, setTrainingStatus] = useState("");
  const [plots, setPlots] = useState({});
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleButtonClick = async () => {
    if (!file) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsTraining(true); // Start training
    try {
      const trainingResponse = await fetch(
        "http://127.0.0.1:5001/train_model",
        {
          method: "POST",
          body: formData,
        }
      );
      const trainingData = await trainingResponse.json();
      setTrainingStatus(trainingData.message);
      setPlots(trainingData.plots);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsTraining(false); // Stop training
    }
  };

  // Simulate training progress
  useEffect(() => {
    if (isTraining) {
      const interval = setInterval(() => {
        if (trainingProgress < 100) {
          setTrainingProgress((prevProgress) => prevProgress + 10); // Increment progress
        } else {
          clearInterval(interval);
        }
      }, 1000); // Change the interval as needed
      return () => clearInterval(interval); // Cleanup function
    }
  }, [isTraining, trainingProgress]);

  return (
    <div className="model-training-container">
      <input
        className="model-training-input"
        type="file"
        accept=".csv,.json"
        onChange={handleFileChange}
      />
      <br />
      <button className="model-training-btn" onClick={handleButtonClick}>
        Train Model
      </button>
      {cleaningStatus && <p>{cleaningStatus}</p>}
      {trainingStatus && <p>Training Status: {trainingStatus}</p>}
      {isTraining && <p>Training Progress: {trainingProgress}%</p>}
      {Object.keys(plots).length > 0 && (
        <div className="plot-container">
          {Object.keys(plots).map((variable, index) => (
            <div key={index} className="plot">
              <h3 className="plot-title">{variable}</h3>
              <div className="plot-images">
                <img
                  className="plot-image"
                  src={`data:image/png;base64,${plots[variable].autocorrelation_plot}`}
                  alt={`Autocorrelation Plot for ${variable}`}
                />
              </div>
              <div className="plot-images">
                <img
                  className="plot-image"
                  src={`data:image/png;base64,${plots[variable].seasonal_decomposition_plot}`}
                  alt={`Seasonal Decomposition Plot for ${variable}`}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Model_training;
