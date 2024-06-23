import React, { useState } from "react";
import "../styles/Transactions.css";
import { formatDate, formatAmountDecimal } from "../utils/helpers.js";
import Auth from "../utils/auth";
import { GoTrash } from "react-icons/go";

const TransactionTable = ({
  data,
  loading,
  deleteTransaction,
  transactions,
  setTransactions,
}) => {
  const [sortOption, setSortOption] = useState("date");

  if (loading) {
    return <div>Loading...</div>;
  }

  // create function that accepts the transactions's mongo _id value as param and deletes the transaction from the database
  const handleDeleteTransaction = async (e) => {
    e.preventDefault();
    const transactionId = e.currentTarget.id;
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    try {
      const { data } = await deleteTransaction({
        variables: { transactionId },
      });

      if (!data) {
        throw new Error("something went wrong!");
      }

      console.log("done!");
    } catch (err) {
      console.error(err);
    }
    setTransactions(
      transactions.filter((transactions) => transactions._id !== transactionId)
    );
    console.log(data);
  };

  const handleSortOptionChange = (event) => {
    setSortOption(event.target.value);
  };

  if (!transactions.length) {
    return <h3>No Transactions Recorded Yet</h3>;
  }

  let sortedTransactions = [...transactions];

  if (sortOption === "date") {
    sortedTransactions.sort((transactionA, transactionB) => {
      const dateA = new Date(parseInt(transactionA.date));
      const dateB = new Date(parseInt(transactionB.date));
      return dateB - dateA;
    });
  } else if (sortOption === "amount") {
    sortedTransactions.sort((transactionA, transactionB) => {
      console.log(`transactionA.amount: ${transactionA.amount}`);
      console.log(`transactionB.amount: ${transactionB.amount}`);
      console.log(
        `transactionB.amount - transactionA.amount: ${
          transactionB.amount - transactionA.amount
        }`
      );
      return transactionB.amount - transactionA.amount;
    });
  } else if (sortOption === "category") {
    sortedTransactions.sort((transactionA, transactionB) => {
      return transactionA.category.localeCompare(transactionB.category);
    });
  }

  return (
    <div>
      <div className="form-group sort-div d-flex">
        <label htmlFor="sort-option-select" className="sort">
          Sort By:
        </label>
        <select
          className="form-control form-select"
          id="sort-option-select"
          value={sortOption}
          onChange={handleSortOptionChange}
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
          <option value="category">Category</option>
        </select>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-light">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Essential?</th>
              <th scope="col">Category</th>
              <th scope="col">Amount</th>
              <th scope="col">Description</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{formatDate(transaction.date)}</td>
                <td>{transaction.highLevelCategory}</td>
                <td>{transaction.category}</td>
                <td>{formatAmountDecimal(transaction.amount)}</td>
                <td>{transaction.description}</td>
                <td>
                  <button
                    className="btn"
                    id={transaction._id}
                    onClick={handleDeleteTransaction}
                  >
                    <GoTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
