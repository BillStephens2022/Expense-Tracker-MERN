import React, { useState } from "react";
import "../styles/TransactionForm.css";
import { formatDate } from "../utils/helpers.js";

const TransactionList = ({ transactions, title, showTitle = true }) => {
  if (!transactions.length) {
    return <h3>No Transactions Recorded Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3 id="transaction-list-title">{title}</h3>}
      {transactions &&
        transactions.map((transaction) => (
          <div className="card transaction-item">
            <div className="card-header">
              <p>
                <span className="transaction-date">{transaction.date}</span>
                <span className="transaction-category">
                  {transaction.category}
                </span>
              </p>
            </div>
            <div className="card-body">
              <p>Amount(USD): {transaction.amount}</p>
              <p>Description: {transaction.description}</p>
              <p>{transaction.highLevelCategory}</p>
            </div>
            <div className="card-footer">{transaction.username}</div>
          </div>
        ))}
    </div>
  );
};

export default TransactionList;
