import React, { useState } from "react";
import "../styles/TransactionForm.css";
import { formatDate, formatAmount } from "../utils/helpers.js";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

const TransactionTable = () => {
  const { loading, data } = useQuery(QUERY_ME);
  let transactions = data?.me.transactions || [];

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!transactions.length) {
    return <h3>No Transactions for Table Recorded Yet</h3>;
  }

  return (
    <div>
      <h1 id="transaction-table-header">Your Transactions</h1>
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
          {transactions.map((transaction) => (
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
