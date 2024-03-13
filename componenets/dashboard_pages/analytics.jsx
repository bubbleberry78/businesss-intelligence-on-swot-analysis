import React, { useState } from "react";
import Profits from "../../charts_components/Profits";
import Sales from "../../charts_components/Sales";
import Production from "../../charts_components/Production";
import Operatingcost from "../../charts_components/operatingcost";
import MarketSize from "../../charts_components/marketSize";
import Customer from "../../charts_components/customer";
import Costing from "../../charts_components/costing";
import Overall from "../../charts_components/Overall";
import ReportGenerator from "../report_generation";
import "./analytics.css";

const Analytics = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const renderSelectedContent = () => {
    switch (selectedOption) {
      case "Profit":
        return (
          <div>
            <Profits />
          </div>
        );
      case "Sales":
        return (
          <div>
            <Sales />
          </div>
        );
      case "Production":
        return (
          <div>
            <Production />
          </div>
        );
      case "MarketSize":
        return (
          <div>
            <MarketSize />
          </div>
        );
      case "Customer":
        return (
          <div>
            <Customer />
          </div>
        );
      case "Costing":
        return (
          <div>
            <Costing />
          </div>
        );
      case "OperatingExpenses":
        return (
          <div>
            <Operatingcost />
          </div>
        );
      default:
        return (
          <div>
            <Overall />
          </div>
        );
    }
  };

  return (
    <div className="analytics-container">

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

        <ReportGenerator />

        <div className="chart-container">
        {renderSelectedContent()}
        </div>
        
  
      

    </div>
    
  );
};

export default Analytics;
