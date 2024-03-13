import React, { useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import './forecast_profits.css';

const Forecast_profits = () => {
  const [forecastDuration, setForecastDuration] = useState(null);
  const [profitsForecast, setProfitsForecast] = useState([]);
  const sessionId = sessionStorage.getItem("sessionId");
  console.log(sessionId);
  const handleForecast = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5001/forecast/profits",
        {
          session_id: sessionId,
          forecast_duration: parseInt(forecastDuration),
        }
      );
      setProfitsForecast(response.data.profits_forecast);
      console.log(response);
    } catch (error) {
      console.error("Error fetching profit forecast:", error);
    }
  };
  const handleDurationChange = (event) => {
    setForecastDuration(event.target.value); // Update forecast duration based on user selection
  };

  return (
    <div className="forecast-profits-container">
      <div className="dropdown-container">
        <label>
          <select value={forecastDuration} onChange={handleDurationChange}>
            <option value={1}>1 Year</option>
            <option value={3}>3 Years</option>
            <option value={5}>5 Years</option>
          </select>
        </label>
        <button onClick={handleForecast}>Forecast</button>
        {profitsForecast.length > 0 && (
          <div className="profits-box">
            <Plot
              data={[
                {
                  x: Array.from(
                    { length: profitsForecast.length },
                    (_, i) => i + 1
                  ),
                  y: profitsForecast,
                  type: "scatter",
                  mode: "lines",
                  name: "Profit Forecast",
                  line: { color: "blue" },
                },
              ]}
              layout={{
                width: 800,
                height: 400,
                title: "Profit Forecast",
                xaxis: {
                  title: "Forecast Period",
                },
                yaxis: {
                  title: "Profit",
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Forecast_profits;
