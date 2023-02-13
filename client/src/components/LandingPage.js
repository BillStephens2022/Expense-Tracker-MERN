import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_TRANSACTIONS } from "../utils/queries";
import TransactionList from "./TransactionList";
import TransactionForm from "./TransactionForm";
// import "../styles/LandingPage.css";
import moment from "moment";
import { Modal } from "react-bootstrap";

const LandingPage = () => {
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  // uses moment.js to set start of current week starting on sunday formatted MM/DD/YYYY
  const [startDate, setStartDate] = useState(
    moment().startOf("week").format("L")
  );

  // uses moment.js to set end of current week ending on saturday formatted MM/DD/YYYY
  const [endDate, setEndDate] = useState(moment().endOf("week").format("L"));

  // query transaction data then destructure the transactions from all the data
  const { data } = useQuery(QUERY_TRANSACTIONS);
  const transactions = data?.transactions || [];
  console.log(transactions);

  // formatting, "L" MM/DD/YYYY, "M" current month
  const currentDate = moment().format("L");
  const currentMonth = moment().format("M");

  console.log(currentMonth);
  console.log(currentDate);
  console.log(transactions);

  // come up with calculations here

  return (
    <div className="container">
      <h1 className="mt-5">Welcome to your Expense Tracker!</h1>
      <h4 className="mt-4">
        Expenditure for Current Month: total expenditure goes here
      </h4>
      <h4 className="mt-4">
        Spending for {currentDate}: calculate current date's spending amount
      </h4>

      <h4 className="mt-4">
        Expenditure for Current Week ({startDate} - {endDate}): $ formula to
        take
      </h4>
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
                  <TransactionForm />
                </Modal.Body>
              </Modal>
            </div>
          </div>
        )}
      </div>
      <div className="mt-4">
        <TransactionList
          transactions={transactions}
          title="All Transactions"
          showTitle={true}
        />
      </div>
    </div>
  );
};

export default LandingPage;
