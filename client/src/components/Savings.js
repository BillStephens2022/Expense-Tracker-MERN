import React, { useState } from "react";
import { formatAmount, calculateFutureValue } from "../utils/helpers";

export default function Savings({ currentMonthHighLevel }) {
  function getNonEssential() {
    let highLevelArr = currentMonthHighLevel;
    for (let i = 0; i < highLevelArr.length; i++) {
      if (highLevelArr[i].highLevelCategory === "Non-Essential") {
        let nonEssentialSpending = Math.round(highLevelArr[i].amount);
        console.log("Non-Essential: ", nonEssentialSpending);
        return nonEssentialSpending;
      }
    }
  }

  const [calculateFormState, setCalculateFormState] = useState({
    initialAmount: "",
    monthlyContribution: "",
    rate: "",
    frequency: "",
    years: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const nonEssentialSpending = getNonEssential();

  const PMT = formatAmount(Math.round(nonEssentialSpending * 0.1));

  const r = 5;
  const n = 12; //..i.e. monthly
  const t = 10;

  const savings = calculateFutureValue(0, PMT, r, n, t);

  function handleSubmit(e) {
    e.preventDefault();
    setCalculateFormState({
      ...calculateFormState,
      [e.target.name]: e.target.value,
    });
    console.log(calculateFormState);

    const { initialAmount, monthlyContribution, rate, frequency, years } =
      calculateFormState;
    const calculatedSavings = calculateFutureValue(
      initialAmount,
      monthlyContribution,
      rate,
      frequency,
      years
    );
    console.log(calculatedSavings);
    const result = formatAmount(calculatedSavings.toFixed(0));
    document.getElementById("result").innerHTML = `$${result}`;
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

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const currentMonthYear = month + " " + year;

  return (
    <div>
      <div className="savings blue-text">
        <h2>Save More!</h2>
        <h5 className="mb-3 blue-text">
          Your total non-essential spending for {currentMonthYear} is{" "}
          <span className="red-text">
            ${formatAmount(nonEssentialSpending)}
          </span>
          .
        </h5>
        <h5 className="mb-3 blue-text">
          If you were to save 10% of your non-essential expenses, that would be{" "}
          <span className="red-text">${formatAmount(PMT)}</span> per month.
        </h5>
        <h5 className="blue-text">
          If you were to invest those savings at an average 5% return over 10
          years, compounded monthly, you would save{" "}
          <span className="red-text">${formatAmount(savings.toFixed(0))}</span>
        </h5>
      </div>
      <div className="calculator-div">
        <h3 className="form-heading">Compound Interest Calculator</h3>
        <h6>Find out how much you could save over the long term!</h6>
        <form className="calculator-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="initialAmount">Initial Amount (USD):</label>
            <input
              className="form-control"
              id="initialAmount"
              name="initialAmount"
              onBlur={handleChange}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="monthlyContribution">
              Monthly Contribution Amount (USD):
            </label>
            <input
              className="form-control"
              id="monthlyContribution"
              name="monthlyContribution"
              onBlur={handleChange}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="rate">
              Annual Rate of Return (example: enter 5 for 5%):
            </label>
            <input
              className="form-control"
              id="rate"
              name="rate"
              onBlur={handleChange}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="frequency">Compunding Frequency:</label>
            <select
              className="form-control form-select"
              id="frequency"
              name="frequency"
              onBlur={handleChange}
            >
              <option value="" defaultValue></option>
              <option value="1">Annually</option>
              <option value="2">Semi-Annually</option>
              <option value="4">Quarterly</option>
              <option value="12">Monthly</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="rate">Investment Term (in years)</label>
            <input
              className="form-control"
              id="years"
              name="years"
              onBlur={handleChange}
            ></input>
          </div>

          <div className="form-group">
            <button type="submit" className="btnContact btn calc-button">
              {" "}
              Calculate
            </button>
          </div>
        </form>
      </div>
      <div id="result-div">
        You would save: <span id="result"></span>
      </div>
    </div>
  );
}
