import React, { useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import './forecast_costing.css';

const Forecast_costing = () => {
  const [forecastDuration, setForecastDuration] = useState(null);
  const [costingForecast, setCostingForecast] = useState([]);
  const sessionId = sessionStorage.getItem("sessionId");
  console.log(sessionId);
  const handleForecast = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5001/forecast/costing",
        {
          session_id: sessionId,
          forecast_duration: parseInt(forecastDuration),
        }
      );
      setCostingForecast(response.data.costing_forecast);
      console.log(response);
    } catch (error) {
      console.error("Error fetching profit forecast:", error);
    }
  };
  const handleDurationChange = (event) => {
    setForecastDuration(event.target.value); // Update forecast duration based on user selection
  };

  return (
    <div className="forecasst-costing-container">
      <div className="dropdown-container">
        <label>
          <select value={forecastDuration} onChange={handleDurationChange}>
            <option value={1}>1 Year</option>
            <option value={3}>3 Years</option>
            <option value={5}>5 Years</option>
          </select>
        </label>
        <button onClick={handleForecast}>Forecast</button>
        {costingForecast.length > 0 && (
          <div className="costing-box">
            <Plot
              data={[
                {
                  x: Array.from(
                    { length: costingForecast.length },
                    (_, i) => i + 1
                  ),
                  y: costingForecast,
                  type: "scatter",
                  mode: "lines",
                  name: "Costing Forecast",
                  line: { color: "blue" },
                },
              ]}
              layout={{
                width: 800,
                height: 400,
                title: "Costing Forecast",
                xaxis: {
                  title: "Forecast Period",
                },
                yaxis: {
                  title: "Costing",
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Forecast_costing;
