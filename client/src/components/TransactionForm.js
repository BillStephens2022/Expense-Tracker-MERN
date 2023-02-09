import React, { useState } from "react";
import "../styles/TransactionForm.css";
// import Auth from "../utils/auth";
import $ from 'jquery';
import dollar from "../images/dollar.png";




export default function TransactionForm() {

  const [errorMessage, setErrorMessage] = useState("");
  const [formState, setFormState] = useState({
    date: '',
    amount: '',
    highLevelCategory: '',
    category: '',
    description: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log('submitted!');
  }

  function handleChange(e) {
    if (!e.target.value.length) {
      setErrorMessage(`${e.target.name} is required`);
    } else {
      setErrorMessage("");
    }

    if (!errorMessage) {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    }
  }

  $(function(){
    $('#datepicker').datepicker();
  });

  return (
    <div className="container">
      <div className="transaction-form">
        <div className="transaction-image">
          <img src={dollar} alt="logo pic" className="transaction-pic" />
        </div>
        <form>
          <h3>Enter a Transaction</h3>
          <div class="form-group">
            <label for="date">Transaction Date</label>
            <div class="input-group date" id="datepicker">
              <input
                type="text"
                name="date"
                class="form-control"
                id="date"
                placeholder="transaction date"
                onBlur={handleChange}
              ></input>
              <span class="input-group-append">
                <span class="input-group-text bg-light d-block">
                  <i class="fa fa-calendar"></i>
                </span>
              </span>
            </div>
          </div>
          <div class="form-group">
            <label for="amount">Transaction Amount (USD):</label>
            <input class="form-control" id="amount" name="amount" onBlur={handleChange}></input>
          </div>
          <div class="form-group">
            <label for="highLevelCategory">Essential/Non-Essential:</label>
            <select class="form-control" id="highLevelCategory" onBlur={handleChange}>
              <option>Essential</option>
              <option>Non-Essential</option>
            </select>
          </div>
          <div class="form-group">
            <label for="category">Select a Category:</label>
            <select class="form-control" id="category" onBlur={handleChange}>
              <option>Housing</option>
              <option>Food</option>
              <option>Transportation</option>
              <option>Utilities - Gas, Electric, Water</option>
              <option>Cable/Streaming Services</option>
              <option>Insurance</option>
              <option>Medical/Health</option>
              <option>Entertainment</option>
              <option>Vacations</option>
              <option>Charity</option>
            </select>
          </div>
          <div class="form-group">
            <label for="description">Transaction Description:</label>
            <textarea class="form-control" id="description" rows="3">
              Transaction Description
            </textarea>
          </div>
          <div className="form-group">
                <button
                  type="submit"
                  className="btnContact btn btn-primary"
                  onSubmit={handleSubmit}
                > Send Message
                </button>
                {errorMessage ? <p className="error-message">{errorMessage}</p> : null }
              </div>
        </form>
      </div>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    </div>
  );
};


