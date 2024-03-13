import React, { useState } from "react";
import Forecast_profits from "../../prediction_charts/forecast_profits";
import Forecast_sales from "../../prediction_charts/forecast_sales";
import Forecast_production from "../../prediction_charts/forecast_production";
import Forecast_market from "../../prediction_charts/forecast_market";
import Forecast_customer from "../../prediction_charts/forecast_customer";
import Forecast_costing from "../../prediction_charts/forecast_costing";
import Forecast_operating_expenses from "../../prediction_charts/forecast_operating_expenses";
import './reports.css'

const Reports = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const renderSelectedContent = () => {
    switch (selectedOption) {
      case "Profit":
        return (
          <div>
            <Forecast_profits/>
          </div>
        );
      case "Sales":
        return (
          <div>
            <Forecast_sales/>
          </div>
        );
      case "Production":
        return (
          <div>
            <Forecast_production/>
          </div>
        );
      case "MarketSize":
        return (
          <div>
            <Forecast_market/>
          </div>
        );
      case "Customer":
        return (
          <div>
            <Forecast_customer/>
          </div>
        );
      case "Costing":
        return (
          <div>
            <Forecast_costing/>
          </div>
        );
      case "OperatingExpenses":
        return (
          <div>
            <Forecast_operating_expenses/>
          </div>
        );
      default:
        return (
          <div>
            <Forecast_profits/>
          </div>
        );
    }
  };

  return (
    <div className="reports-container">
      <select className="dropdown" value={selectedOption} onChange={handleOptionChange}>
        <option value="">Overall</option>
        <option value="Profit">Profit</option>
        <option value="Sales">Sales</option>
        <option value="Production">Production</option>
        <option value="MarketSize">MarketSize</option>
        <option value="Customer">Customer</option>
        <option value="Costing">Costing</option>
        <option value="OperatingExpenses">OperatingExpenses</option>
        
        
      </select>
      {/* Render selected content below the dropdown */}
      {renderSelectedContent()}
    </div>
  );
};

export default Reports;
