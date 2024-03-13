import React, { useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import './forecast_production.css';

const Forecast_production = () => {
  const [forecastDuration, setForecastDuration] = useState(null);
  const [productionForecast, setProductionForecast] = useState([]);
  const sessionId = sessionStorage.getItem("sessionId");
  console.log(sessionId);
  const handleForecast = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5001/forecast/production",
        {
          session_id: sessionId,
          forecast_duration: parseInt(forecastDuration),
        }
      );
      setProductionForecast(response.data.production_forecast);
      console.log(response);
    } catch (error) {
      console.error("Error fetching profit forecast:", error);
    }
  };
  const handleDurationChange = (event) => {
    setForecastDuration(event.target.value); // Update forecast duration based on user selection
  };

  return (
    <div className="forecast-productions-container">
      <div className="dropdown-container">
        <label>
          <select value={forecastDuration} onChange={handleDurationChange}>
            <option value={1}>1 Year</option>
            <option value={3}>3 Years</option>
            <option value={5}>5 Years</option>
          </select>
        </label>
        <button onClick={handleForecast}>Forecast</button>
        {productionForecast.length > 0 && (
          <div className="production-box">
            <Plot
              data={[
                {
                  x: Array.from(
                    { length: productionForecast.length },
                    (_, i) => i + 1
                  ),
                  y: productionForecast,
                  type: "scatter",
                  mode: "lines",
                  name: "Production Forecast",
                  line: { color: "blue" },
                },
              ]}
              layout={{
                width: 800,
                height: 400,
                title: "Production Forecast",
                xaxis: {
                  title: "Forecast Period",
                },
                yaxis: {
                  title: "Production",
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Forecast_production;
