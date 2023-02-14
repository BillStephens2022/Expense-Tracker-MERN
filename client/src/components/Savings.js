import React, { useState } from "react";
import { formatAmount, calculateFutureValue } from "../utils/helpers";
export default function Savings() {
  const [calculateFormState, setCalculateFormState] = useState({
    initialAmount: "",
    monthlyContribution: "",
    rate: "",
    frequency: "",
    years: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const nonEssentialSpending = 2350.0;
  const PMT = nonEssentialSpending * 0.1;

  const r = 0.05;
  const n = 12; //..i.e. monthly
  const t = 10;

  const savings = calculateFutureValue(PMT, r, n, t);

  function handleSubmit(e) {
    e.preventDefault();
    setCalculateFormState({
      ...calculateFormState,
      [e.target.name]: e.target.value,
    });
    console.log(calculateFormState);

    const {initialAmount, monthlyContribution, rate, frequency, years} = calculateFormState;
    const calculatedSavings = calculateFutureValue(initialAmount, monthlyContribution, rate, frequency, years)
    console.log(calculatedSavings);
    const result = formatAmount(calculatedSavings.toFixed(0));
    document.getElementById('result').innerHTML = `$${result}`;
    return result;
  }

  function handleChange(e) {
    if (!e.target.value.length) {
      setErrorMessage(`${e.target.name} is required`);
    } else {
      setErrorMessage("");
    }

    if (!errorMessage) {
      setCalculateFormState({
        ...calculateFormState,
        [e.target.name]: e.target.value,
      });
      console.log(calculateFormState);
    }
  }

  return (
    <div>
      <div className="savings">
        <h2>Save More!</h2>
        <h3>
          If you were to cut 10% per month of your $
          {formatAmount(nonEssentialSpending)} non-essential spending,
        </h3>
        <h3>
          you would save ${formatAmount(PMT)} per month. If you invested that
          monthly at an average 5% return over 10 years, you would save $
          {formatAmount(savings.toFixed(0))}
        </h3>
      </div>
      <div className="calculator-div">
        <h3 className="form-heading">Compound Interest Calculator</h3>
        <form className="calculator-form" onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="initialAmount">Initial Amount (USD):</label>
            <input className="form-control" id="initialAmount" name="initialAmount" onBlur={handleChange}></input>
          </div>

          <div className="form-group">
            <label htmlFor="monthlyContribution">Monthly Contribution (USD):</label>
            <input className="form-control" id="monthlyContribution" name="monthlyContribution" onBlur={handleChange}></input>
          </div>
          <div className="form-group">
            <label htmlFor="rate">Annual Rate of Return:</label>
            <input className="form-control" id="rate" name="rate" onBlur={handleChange}></input>
          </div>
          <div className="form-group">
            <label htmlFor="frequency">Compunding Frequency:</label>
            <select className="form-control" id="frequency" name="frequency" onBlur={handleChange}>
              <option value="" selected></option>
              <option value="1">Annually</option>
              <option value="2">Semi-Annually</option>
              <option value="4">Quarterly</option>
              <option value="12">Monthly</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="rate">Investment Term (in years)</label>
            <input className="form-control" id="years" name="years" onBlur={handleChange}></input>
          </div>

          <div className="form-group">
            <button type="submit" className="btnContact btn btn-primary">
              {" "}
              Calculate
            </button>
          </div>
        </form>
      </div>
      <div id="result-div">You would save: <span id="result"></span></div>
    </div>
  );
}
