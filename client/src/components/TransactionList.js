import React, { useState } from "react";
import "../styles/TransactionForm.css";

const TransactionList = ({
    transactions,
    title,
    showTitle = true,
}) => {
    if (!transactions.length) {
        return <h3>No Transactions Recorded Yet</h3>;
    }

    return (
      <div>
      {showTitle && <h3>{title}</h3>}
        {transactions && transactions.map((transaction) => (
            <div className="transaction-item">
              {transaction.date}
              {transaction.amount}
              {transaction.highLevelCategory}
              {transaction.category}
              {transaction.description}
            </div>
        ))}
      </div>
    );
};

export default TransactionList;
