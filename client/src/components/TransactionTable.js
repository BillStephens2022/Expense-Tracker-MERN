import React, { useState } from "react";
import "../styles/TransactionForm.css";
import { formatDate, formatAmount } from "../utils/helpers.js";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

const TransactionTable = ({ transactions }) => {

  const [sortOption, setSortOption] = useState("date");

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
      console.log(`transactionB.amount - transactionA.amount: ${transactionB.amount - transactionA.amount}`);
      return transactionB.amount - transactionA.amount;
    });
  } else if (sortOption === "category") {
    sortedTransactions.sort((transactionA, transactionB) => {
      return transactionA.category.localeCompare(transactionB.category);
    });
  }

  return (
    <div>
      <h1 id="transaction-table-header">Your Transactions</h1>

      <div className="form-group">
        <label htmlFor="sort-option-select">Sort By:</label>
        <select
          className="form-control"
          id="sort-option-select"
          value={sortOption}
          onChange={handleSortOptionChange}
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
          <option value="category">Category</option>
        </select>
      </div>

      <table class="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Essential?</th>
            <th scope="col">Category</th>
            <th scope="col">Amount</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{formatDate(transaction.date)}</td>
              <td>{transaction.highLevelCategory}</td>
              <td>{transaction.category}</td>
              <td>{formatAmount(transaction.amount)}</td>
              <td>{transaction.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default TransactionTable;
