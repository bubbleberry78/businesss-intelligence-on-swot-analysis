import React, { useState } from "react";
import "./swot_forms.css";
import SuccessDialog from "../../small components/success_dialog";

const Swot_forms = () => {
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [formData, setFormData] = useState({
    year: "",
    profit: "",
    sales: "",
    production: "",
    marketSize: "",
    customer: "",
    costing: "",
    operatingExpenses: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Call function to submit form data
      submitFormData(formData);
    }
  };

  const submitFormData = (formData) => {
    const sessionId = sessionStorage.getItem("sessionId"); // Retrieve sessionId from session storage
    formData.sessionId = sessionId;

    fetch("http://localhost:5000/api/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setSubmissionStatus("success"); // Set submission status to success
          clearForm();
        } else {
          setSubmissionStatus("error");
        }
      })
      .catch((error) => {
        console.error("Error while submitting form data:", error);
        setSubmissionStatus("error");
      });
  };
  const clearForm = () => {
    setFormData({
      year: "",
      profit: "",
      sales: "",
      production: "",
      marketSize: "",
      customer: "",
      costing: "",
      operatingExpenses: "",
    });
  };

  const validateForm = () => {
    let isValid = true;
    Object.values(formData).forEach((value) => {
      if (!value) {
        isValid = false;
      }
    });
    return isValid;
  };

  const closeDialog = () => {
    setSubmissionStatus(null);
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>YEAR</label>
          <input
            type="number"
            id="year"
            className="input"
            name="year"
            value={formData.year}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>PROFIT</label>
          <input
            type="number"
            id="profit"
            className="input"
            name="profit"
            value={formData.profit}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>SALES</label>
          <input
            type="number"
            id="sales"
            className="input"
            name="sales"
            value={formData.sales}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>PRODUCTION</label>
          <input
            type="number"
            id="production"
            className="input"
            name="production"
            value={formData.production}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>MARKET-SIZE</label>
          <input
            type="number"
            id="marketSize"
            className="input"
            name="marketSize"
            value={formData.marketSize}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>CUSTOMER</label>
          <input
            type="number"
            id="customer"
            className="input"
            name="customer"
            value={formData.customer}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>COSTING</label>
          <input
            type="number"
            id="costing"
            className="input"
            name="costing"
            value={formData.costing}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>OPERATING EXPENSES</label>
          <input
            type="number"
            id="operatingExpenses"
            className="input"
            name="operatingExpenses"
            value={formData.operatingExpenses}
            onChange={handleChange}
          />
        </div>
        <button className="submit-btn" type="submit">
          SUBMIT
        </button>
      </form>
      {submissionStatus === "success" && (
        <SuccessDialog onClose={closeDialog} />
      )}
      {submissionStatus === "error" && (
        <p className="message error">
          Failed to submit form data. Please try again.
        </p>
      )}
    </div>
  );
};

export default Swot_forms;
