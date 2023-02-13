import React, { useState, useRef } from "react";
import "../styles/TransactionForm.css";
import dollar from "../images/dollar.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation } from '@apollo/client';
import { FaCalendarAlt } from 'react-icons/fa';

import { ADD_TRANSACTION } from '../utils/mutations';
import { QUERY_TRANSACTIONS, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

export default function TransactionForm() {
  const [transactionFormState, setTransactionFormState] = useState({
    date: '',
    amount: '',
    highLevelCategory: '',
    category: '',
    description: '',
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [addTransaction, {error}] = useMutation(ADD_TRANSACTION, {
    update(cache, { data: {addTransaction } }) {
      try {
        const { transactions } = cache.readQuery({ query: QUERY_TRANSACTIONS });

        cache.writeQuery({
          query: QUERY_TRANSACTIONS,
          data: { transactions: [addTransaction, ...transactions] }, 
        });

      } catch (e) {
        console.log('error with mutation!');
        console.error(e);
      }
    }
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const inputRef = useRef(null);

  function handleDateSelect(date) {
    setTransactionFormState({ ...transactionFormState, date: date.toLocaleDateString() });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("submitted!");
    console.log(transactionFormState);
    
    try {
      const { data } = await addTransaction({
        variables: {
          ...transactionFormState
        }
      });
      console.log("this is my data" + data);
      setTransactionFormState({
        date: '',
        amount: '',
        highLevelCategory: '',
        category: '',
        description: '',
      });
    } catch (err) {
      console.error(err);
    }
  };

  function handleChange(e) {
    if (!e.target.value.length) {
      setErrorMessage(`${e.target.name} is required`);
    } else {
      setErrorMessage("");
    }

    if (!errorMessage) {
      setTransactionFormState({ ...transactionFormState, [e.target.name]: e.target.value });
      console.log(transactionFormState);
    }
  }

  function handleInputClick() {
    setShowDatePicker(true);
  }

  function handleInputBlur() {
    if (inputRef.current.contains(document.activeElement)) {
      return;
    }
    setShowDatePicker(false);
  }

  return (
    <div className="container">
      <div className="transaction-form">
        <div className="transaction-image">
          <img src={dollar} alt="logo pic" className="transaction-pic" />
        </div>
        <form onSubmit={handleSubmit}>
          <h3>Enter a Transaction</h3>
          <div className="form-group">
            <label htmlFor="date">Transaction Date</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="date"
                name="date"
                value={transactionFormState.date}
                onChange={() => {}}
                onClick={handleInputClick}
                onBlur={handleInputBlur}
                ref={inputRef}
              />
              <div className="input-group-append">
                                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleInputClick}
                >
                  <FaCalendarAlt size={20} />
                </button>
              </div>
              {showDatePicker && (
                <div className="date-picker-container">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                      handleDateSelect(date);
                      setShowDatePicker(false);
                    }}
                    inline
                  />
                </div>
              )}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="amount">Transaction Amount (USD):</label>
            <input className="form-control" id="amount" name="amount" onBlur={handleChange}></input>
          </div>
          <div className="form-group">
            <label htmlFor="highLevelCategory">Essential/Non-Essential:</label>
            <select className="form-control" id="highLevelCategory" onBlur={handleChange} name="highLevelCategory">
              <option value="Essential" selected="selected">Essential</option>
              <option value="Non-Essential">Non-Essential</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="category">Select a Category:</label>
            <select className="form-control" id="category" onBlur={handleChange} name="category">
              <option value="Housing" selected="selected">Housing</option>
              <option value="Food">Food</option>
              <option value="Transportation">Transportation</option>
              <option value="Utilities - Gas, Electric, Water">Utilities - Gas, Electric, Water</option>
              <option value="Cable/Streaming Services">Cable/Streaming Services</option>
              <option value="Insurance">Insurance</option>
              <option value="Medical/Health">Medical/Health</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Vacations">Vacations</option>
              <option value="Charity">Charity</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Transaction Description:</label>
            <textarea name="description" className="form-control" id="description" rows="3" onBlur={handleChange}>
              
            </textarea>
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btnContact btn btn-primary"
            >
              Add Transaction
            </button>
            {errorMessage ? <p className="error-message">{errorMessage}</p> : null }
          </div>
        </form>
      </div>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    </div>
  );
};

