import React, { useState } from "react";
import "../styles/TransactionForm.css";
// import Auth from "../utils/auth";
import dollar from "../images/dollar.png";
import Date from "./DatePicker";
import { useMutation } from '@apollo/client';

import { ADD_TRANSACTION } from '../utils/mutations';
import { QUERY_TRANSACTIONS, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';



export default function TransactionForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [transactionFormState, setTransactionFormState] = useState({
    date: '',
    amount: '',
    highLevelCategory: '',
    category: '',
    description: '',
  });

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
      // const { me } = cache.readQuery({ query: QUERY_ME });
      // cache.writeQuery({
      //   query: QUERY_ME,
      //   data: { me: { ...me, transactions: [...me.transactions], addTransaction } },
      // })
    }
  });

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
      transactionFormState('');
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
    }
  }

  





  return (
    <div className="container">
      <div className="transaction-form">
        <div className="transaction-image">
          <img src={dollar} alt="logo pic" className="transaction-pic" />
        </div>
        <form>
          <h3>Enter a Transaction</h3>

          
          <div className="form-group">
            <label htmlFor="date">Transaction Date</label>

            <Date />

          </div>

          <div className="form-group">
            <label htmlFor="amount">Transaction Amount (USD):</label>
            <input className="form-control" id="amount" name="amount" onBlur={handleChange}></input>
          </div>
          <div className="form-group">
            <label htmlFor="highLevelCategory">Essential/Non-Essential:</label>
            <select className="form-control" id="highLevelCategory" onBlur={handleChange}>
              <option>Essential</option>
              <option>Non-Essential</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="category">Select a Category:</label>
            <select className="form-control" id="category" onBlur={handleChange}>
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
          <div className="form-group">
            <label htmlFor="description">Transaction Description:</label>
            <textarea name="description" className="form-control" id="description" rows="3" onBlur={handleChange}>
              
            </textarea>
          </div>
          <div className="form-group">
                <button
                  type="submit"
                  className="btnContact btn btn-primary"
                  onClick={handleSubmit}
                > Add Transaction
                </button>
                {errorMessage ? <p className="error-message">{errorMessage}</p> : null }
              </div>
        </form>
      </div>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    </div>
  );
};


