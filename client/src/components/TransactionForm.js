import React, { useState, useRef } from "react";
import "../styles/TransactionForm.css";
import dollar from "../images/dollar.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation } from "@apollo/client";
import { FaCalendarAlt } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { ADD_TRANSACTION } from "../utils/mutations";
import { QUERY_TRANSACTIONS, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

export default function TransactionForm({
  setShowTransactionForm,
  addTransactionList,
  transactions
}) {
  const [transactionFormState, setTransactionFormState] = useState({
    date: "",
    amount: "",
    highLevelCategory: "Essential",
    category: "Housing",
    description: "",
    username: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [addTransaction] = useMutation(ADD_TRANSACTION, 
    {
    update(cache, { data: { addTransaction } }) {
      try {
        const { transactions } = cache.readQuery({
          query: QUERY_TRANSACTIONS,
        }) ?? { transactions: [] };

        cache.writeQuery({
          query: QUERY_TRANSACTIONS,
          data: { transactions: [addTransaction, ...transactions] },
        });
      } catch (e) {
        console.log("error with mutation!");
        console.error(e);
      }
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: {
          me: { ...me, transactions: [...me.transactions], addTransaction },
        },
      });
      
      console.log("updated cache:", cache.data.data);
    },
    variables: {
      date: transactionFormState.date,
      amount: parseFloat(transactionFormState.amount),
      highLevelCategory: transactionFormState.highLevelCategory,
      category: transactionFormState.category,
      description: transactionFormState.description,
      username: Auth.getProfile().data.username,
    },
  });
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  //
  const inputRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("submitted!");
    console.log(parseFloat(transactionFormState.amount));
    try {
      console.log(transactionFormState);
      const token = Auth.loggedIn() ? Auth.getToken() : null;
      const loggedIn = Auth.loggedIn();
      console.log("token: ", token);
      console.log(loggedIn);
      let username = Auth.getProfile().data.username;
      console.log(username);
      let date = transactionFormState.date;
      let amount = parseFloat(transactionFormState.amount);
      let highLevelCategory = transactionFormState.highLevelCategory;
      let category = transactionFormState.category;
      let description = transactionFormState.description;
      transactionFormState.username = Auth.getProfile().data.username;

      const { data } = await addTransaction({
        variables: {
          date,
          amount,
          highLevelCategory,
          category,
          description,
        },
      });

      console.log("this is my data " + data);
      setTransactionFormState({
        date: "",
        amount: "",
        highLevelCategory: "Essential",
        category: "Housing",
        description: "",
      });
      console.log("transactions:", transactions);
      console.log("addTransactions:", data.addTransaction);
      
      addTransactionList(data.addTransaction._id);
      setShowTransactionForm(false);
      window.location.replace('/transactions');
      
    } catch (err) {
      console.error(err);
    }
  }

  // handles date selection
  function handleDateSelect(date) {
    setTransactionFormState({
      ...transactionFormState,
      date: date.toLocaleDateString(), // formats string MM/DD/YYYY, but 0 doesn't show, not sure how to apply the date formatting helper
    });
  }

  function handleChange(e) {
    if (!e.target.value.length) {
      setErrorMessage(`${e.target.name} is required`);
    } else {
      setErrorMessage("");
    }

    if (!errorMessage) {
      setTransactionFormState({
        ...transactionFormState,
        [e.target.name]: e.target.value,
      });
    }
  }

  // handles when user clicks in transaction date input field
  function handleInputClick() {
    setShowDatePicker(true); // sets date picker to true, so it displays
  }

  // when a user clicks outside of the input field / date picker component
  // only closes date picker if you focus on date input field and focus on another
  // if you click date picker and select another input field, it won't close it
  function handleInputBlur() {
    if (inputRef.current.contains(document.activeElement)) {
      return;
    }
    setShowDatePicker(false);
  }

  return (
    <>
      <div className="transaction-form">
        <div className="transaction-image">
          <img src={dollar} alt="logo pic" className="transaction-pic" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="date">Transaction Date</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="date"
                name="date"
                value={transactionFormState.date}
                // satisfies requirement of onChange prop where value of input is controlled by component state? found this on stack overflow
                onChange={() => { }}
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
            <input
              className="form-control"
              id="amount"
              name="amount"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="highLevelCategory">Essential/Non-Essential:</label>
            <select
              className="form-control form-select"
              id="highLevelCategory"
              onChange={handleChange}
              name="highLevelCategory"
            >
              <option value="Essential">Essential</option>
              <option value="Non-Essential">Non-Essential</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="category">Select a Category:</label>
            <select
              className="form-control form-select"
              id="category"
              onChange={handleChange}
              name="category"
            >
              <option value="Housing">Housing</option>
              <option value="Food-Groceries">Food-Groceries</option>
              <option value="Restaurant/Fast-Food">Restaurant/Fast-Food</option>
              <option value="Transportation">Transportation</option>
              <option value="Utilities - Gas, Electric, Water">
                Utilities - Gas, Electric, Water
              </option>
              <option value="Cable/Streaming Services">
                Cable/Streaming Services
              </option>
              <option value="Insurance">Insurance</option>
              <option value="Medical/Health">Medical/Health</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Vacations">Vacations</option>
              <option value="Charity">Charity</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Transaction Description:</label>
            <textarea
              name="description"
              className="form-control"
              id="description"
              rows="3"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <Button variant="primary" type="submit">
              Add Transaction
            </Button>
            {errorMessage ? (
              <p className="error-message">{errorMessage}</p>
            ) : null}
          </div>
        </form>
      </div>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    </>
  );
}
