import React, { useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import './forecast_operating_expenses.css';

const Forecast_operating_expenses = () => {
  const [forecastDuration, setForecastDuration] = useState(null);
  const [operationsForecast, setOperationsForecast] = useState([]);
  const sessionId = sessionStorage.getItem("sessionId");
  console.log(sessionId);
  const handleForecast = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5001/forecast/operations",
        {
          session_id: sessionId,
          forecast_duration: parseInt(forecastDuration),
        }
      );
      setOperationsForecast(response.data.operations_forecast);
      console.log(response);
    } catch (error) {
      console.error("Error fetching profit forecast:", error);
    }
  };
  const handleDurationChange = (event) => {
    setForecastDuration(event.target.value); // Update forecast duration based on user selection
  };

  return (
    <div className="forecast-operating-expenses">
      <div className="dropdown-container">
        <label>
          <select value={forecastDuration} onChange={handleDurationChange}>
            <option value={1}>1 Year</option>
            <option value={3}>3 Years</option>
            <option value={5}>5 Years</option>
          </select>
        </label>
        <button onClick={handleForecast}>Forecast</button>
        {operationsForecast.length > 0 && (
          <div className="operating-box">
            <Plot
              data={[
                {
                  x: Array.from(
                    { length: operationsForecast.length },
                    (_, i) => i + 1
                  ),
                  y: operationsForecast,
                  type: "scatter",
                  mode: "lines",
                  name: "Operating expenses Forecast",
                  line: { color: "blue" },
                },
              ]}
              layout={{
                width: 800,
                height: 400,
                title: "Operating expenses Forecast",
                xaxis: {
                  title: "Forecast Period",
                },
                yaxis: {
                  title: "Operating Expenses",
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Forecast_operating_expenses;
