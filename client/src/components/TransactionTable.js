import React, { useState } from "react";
import "../styles/TransactionForm.css";
import { formatDate, formatAmount } from "../utils/helpers.js";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { DELETE_TRANSACTION } from "../utils/mutations";
import Auth from "../utils/auth";
import Transactions from "../pages/Transactions";



const TransactionTable = () => {
  const { data, loading } = useQuery(QUERY_ME);
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION);
  const [sortOption, setSortOption] = useState("date");
    // create function that accepts the book's mongo _id value as param and deletes the book from the database
    const handleDeleteTransaction = async (e) => {
      e.preventDefault();
      let transactionId = e.target.id;
      console.log(e.target.id);
      console.log('delete requested!');
      const token = Auth.loggedIn() ? Auth.getToken() : null;
      if (!token) {
        return false;
      }
  
      try {
        const { data } = await deleteTransaction({ variables: { transactionId } });
        
        if (!data) {
          throw new Error('something went wrong!');
        }
        console.log('done!');
      } catch (err) {
        console.error(err);
      }
    };
  const transactions = data?.me.transactions || [];
  if (loading) {
    return <div>Loading...</div>;
  }
  
  console.log(data);
  
  
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


      <table className="table table-striped table-dark">
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
              <td>{formatAmount(transaction.amount)}</td>
              <td>{transaction.description}</td>
              <td><button className="btn btn-danger" id={transaction._id} onClick={handleDeleteTransaction}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
