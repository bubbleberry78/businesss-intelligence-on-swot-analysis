import React,{useState} from 'react'
import axios from 'axios';
import Plot from 'react-plotly.js';
import './forecast_market.css';

const Forecast_market = () => {
  const [forecastDuration, setForecastDuration] = useState(null);
  const [marketForecast, setMarketForecast] = useState([]);
  const sessionId = sessionStorage.getItem('sessionId');
  console.log(sessionId);
  const handleForecast = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5001/forecast/marketsize', {
        session_id: sessionId,
        forecast_duration: parseInt(forecastDuration)
      });
      setMarketForecast(response.data.marketsize_forecast);
      console.log(response);
    } catch (error) {
      console.error('Error fetching profit forecast:', error);
    }
  };
  const handleDurationChange = (event) => {
    setForecastDuration(event.target.value); // Update forecast duration based on user selection
  };

  return (
    <div className='forecast-market-container'>
      <div className='dropdown-container'>

      <label>
        <select value={forecastDuration} onChange={handleDurationChange}>
          <option value={1}>1 Year</option>
          <option value={3}>3 Years</option>
          <option value={5}>5 Years</option>
        </select>
      </label>
      <button onClick={handleForecast}>Forecast</button>
      {marketForecast.length > 0 && (
        <div className='market-box'>
          
          <Plot
            data={[
              {
                x: Array.from({ length: marketForecast.length }, (_, i) => i + 1),
                y: marketForecast,
                type: 'scatter',
                mode: 'lines',
                name: 'Market SIze Forecast',
                line: { color: 'blue' }
              }
            ]}
            layout={{
              width: 800,
              height: 400,
              title: 'Market Size Forecast',
              xaxis: {
                title: 'Forecast Period'
              },
              yaxis: {
                title: 'Market Size'
              }
            }}
          />
        </div>
      )}
      </div>
    </div>
  )
}

export default Forecast_market;
