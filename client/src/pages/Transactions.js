import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import TransactionForm from "../components/TransactionForm";
// import "../styles/LandingPage.css";
import moment from "moment";
import { Modal } from "react-bootstrap";
import TransactionTable from "../components/TransactionTable";


const Transactions = () => {
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [transactionList, setTransactionList] = useState([]);

  // uses moment.js to set start of current week starting on sunday formatted MM/DD/YYYY
  const [startDate, setStartDate] = useState(moment().startOf("week").format("L"));

  // uses moment.js to set end of current week ending on saturday formatted MM/DD/YYYY
  const [endDate, setEndDate] = useState(moment().endOf("week").format("L"));

  // query transaction data then destructure the transactions from all the data
  const { data, loading } = useQuery(QUERY_ME);

  if (loading) {
    return <div>Loading...</div>;
  }



  console.log(data);
  const transactions = data?.me.transactions || [];

  const transactionsData = data?.me.transactions.map(transaction => ({
    ...transaction,
    date: moment.unix(transaction.date / 1000).format("MM/DD/YYYY"),
  })) || [];

  function addTransactionList(transaction) {
    console.log(transactionList);
    console.log(transaction);
    setTransactionList([...transactionList, transaction]);
  }

  const me = data?.me.username || "";
  console.log("TRANSACTIONS", transactions);
  console.log(me);

  // formatting, "L" MM/DD/YYYY, "M" current month
  const currentDate = moment().format("L");
  const currentMonth = moment().format("M");

  console.log(currentMonth);
  console.log(currentDate);

  
const todaySpending = transactionsData
  .reduce((acc, transaction) => {
    if (moment(transaction.date).format("L") === currentDate) {
      return acc + transaction.amount;
    }

    return acc;
  }, 0)

  .toLocaleString("en-US", { style: "currency", currency: "USD" });

const currentWeekSpending = transactionsData
  .reduce((acc, transaction) => {
    const transactionDate = moment(transaction.date).format("L");

    if (transactionDate >= startDate && transactionDate <= endDate) {
      return acc + transaction.amount;
    }

    return acc;
  }, 0)

  .toLocaleString("en-US", { style: "currency", currency: "USD" });

const currentMonthSpending = transactionsData
  .reduce((acc, transaction) => {
    if (moment(transaction.date).format("M") === currentMonth) {
      return acc + transaction.amount;
    }

    return acc;
  }, 0)

  .toLocaleString("en-US", { style: "currency", currency: "USD" });


  // come up with calculations here

  return (
    <div className="container transaction-page">

      <h1 className="mt-5 expense-tracker-header">Welcome to your Expense Tracker!</h1>
      
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h4>Spending for {currentDate}:</h4>
              <p>{todaySpending}</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card">
            <div className="card-body">
              <h4>Expenditure for Current Week ({startDate} - {endDate}):</h4>
              <p>{currentWeekSpending}</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card">
            <div className="card-body">
              <h4>Expenditure for Current Month:</h4>
              <p>{currentMonthSpending}</p>
            </div>
          </div>
        </div>

    </div>

      <div className="mt-4">
        <button
          className="btn btn-primary"
          onClick={() => setShowTransactionForm(!showTransactionForm)}
        >
          Add Transaction
        </button>
        {showTransactionForm && (
          <div className="modal-background">
            <div className="modal">
              <Modal show={true} onHide={() => setShowTransactionForm(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Add Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <TransactionForm
                    transactions={transactions}
                    setShowTransactionForm={setShowTransactionForm}
                    addTransactionList={addTransactionList}
                  />
                </Modal.Body>
              </Modal>
            </div>
          </div>
        )}
      </div>
      <div className="mt-4">
        <TransactionTable
          transactions={transactions}
          setTransactionList={setTransactionList}
         
        />
      </div>
    </div>
  );
};

export default Transactions;
