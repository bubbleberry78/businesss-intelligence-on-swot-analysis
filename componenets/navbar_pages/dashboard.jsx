import React, { useState } from "react";
import "./dashboard.css";
import Swot_forms from "../dashboard_pages/swot_forms";
import Model_training from "../dashboard_pages/model_training";
import Analytics from "../dashboard_pages/analytics";
import Report from "../dashboard_pages/report";
import Suggestions from "../dashboard_pages/suggestions";
import { FaFileAlt, FaCogs, FaChartBar, FaChartLine , FaLightbulb } from "react-icons/fa";


function Sidebar({ onItemCLick }) {
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => onItemCLick("Forms")}><FaFileAlt /><span>Forms</span></li>
        <li onClick={() => onItemCLick("Model")}><FaCogs /><span>Models</span></li>
        <li onClick={() => onItemCLick("Analytics")}><FaChartBar /><span>Analytics</span></li>
        <li onClick={() => onItemCLick("Forecasting")}><FaChartLine /><span>Forecast</span></li>
        <li onClick={() => onItemCLick("Suggestions")}><FaLightbulb/><span>Suggestions</span></li>
      </ul>
    </div>
  );
}

function MainSection({ selectedItem }) {
  switch (selectedItem) {
    case "Forms":
      return <Swot_forms />;
    case "Model":
      return <Model_training />;
    case "Analytics":
      return <Analytics />;
    case "Forecasting":
      return <Report />;
    case "Suggestions":
      return <Suggestions/>
    default:
      return <Swot_forms />;
  }
}

function Dashboard() {
  const [selectedItem, setSelectedItem] = useState("Forms");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  return (
    <div className="dashboard-container">
      <div className="sidebar-container">
      <Sidebar onItemCLick={handleItemClick} />
      </div>
      <div className="main-section-container">
        <MainSection selectedItem={selectedItem} />
      </div>
    </div>
  );
}

export default Dashboard;
