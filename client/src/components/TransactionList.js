import React, { useState } from "react";
import "../styles/TransactionForm.css";
import { formatDate, formatAmount } from "../utils/helpers.js";

const TransactionList = ({ transactions, me, title, showTitle = true }) => {
  console.log(transactions);
  if (!transactions.length) {
    return <h3>No Transactions Recorded Yet</h3>;
  }
 
  return (
    <div>
      {showTitle && <h3 id="transaction-list-title">{title}</h3>}
      {transactions &&
        transactions.map((transaction) => (
          <div className="card transaction-item" key={transaction._id}>
            <div className="card-header">
              <p>
                <span className="transaction-date">{formatDate(transaction.date)}</span>
                <span className="transaction-category">
                  {transaction.category}
                </span>
              </p>
            </div>
            <div className="card-body">
              <p>Amount(USD): {formatAmount(transaction.amount)}</p>
              <p>Description: {transaction.description}</p>
              <p>{transaction.highLevelCategory}</p>
            </div>
            <div className="card-footer">{me}</div>
          </div>
        ))}
    </div>
  );
};

export default TransactionList;
