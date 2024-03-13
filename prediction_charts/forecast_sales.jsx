import React,{useState} from 'react'
import axios from 'axios';
import Plot from 'react-plotly.js';
import './forecast_sales.css';

const Forecast_sales = () => {
  const [forecastDuration, setForecastDuration] = useState(null);
  const [salesForecast, setSalesForecast] = useState([]);
  const sessionId = sessionStorage.getItem('sessionId');
  console.log(sessionId);
  const handleForecast = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5001/forecast/sales', {
        session_id: sessionId,
        forecast_duration: parseInt(forecastDuration)
      });
      setSalesForecast(response.data.sales_forecast);
      console.log(response);
    } catch (error) {
      console.error('Error fetching profit forecast:', error);
    }
  };
  const handleDurationChange = (event) => {
    setForecastDuration(event.target.value); // Update forecast duration based on user selection
  };

  return (
    <div className='forecast-sales-container'>
      <div className='dropdown-container'>
      <select value={forecastDuration} onChange={handleDurationChange}>
          <option value={1}>1 Year</option>
          <option value={3}>3 Years</option>
          <option value={5}>5 Years</option>
        </select>
      <button onClick={handleForecast}>Forecast</button>
      {salesForecast.length > 0 && (
        <div className='sales-box'>
          <Plot
            data={[
              {
                x: Array.from({ length: salesForecast.length }, (_, i) => i + 1),
                y: salesForecast,
                type: 'scatter',
                mode: 'lines',
                name: 'Profit Forecast',
                line: { color: 'blue' }
              }
            ]}
            layout={{
              width: 800,
              height: 400,
              title: 'Sales Forecast',
              xaxis: {
                title: 'Forecast Period'
              },
              yaxis: {
                title: 'Sales'
              }
            }}
          />
        </div>
      )}
       </div>  
      </div>  
  )
}

export default Forecast_sales;
