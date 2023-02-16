import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_TRANSACTIONS } from "../utils/queries";
import TransactionList from "../components/TransactionList";
import TransactionForm from "../components/TransactionForm";
import moment from "moment";
import { Modal } from "react-bootstrap";
import TransactionTable from "../components/TransactionTable";

const Transactions = () => {
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [transactionList, setTransactionList] = useState([]);

  // uses moment.js to set start of current week starting on sunday formatted MM/DD/YYYY
  const [startDate, setStartDate] = useState(
    moment().startOf("week").format("L")
  );

  // uses moment.js to set end of current week ending on saturday formatted MM/DD/YYYY
  const [endDate, setEndDate] = useState(moment().endOf("week").format("L"));

  // query transaction data then destructure the transactions from all the data
  const { data, loading } = useQuery(QUERY_ME);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(data);
  const transactions = data?.me.transactions || [];

  function addTransactionList(transaction) {
    console.log(transactionList);
    console.log(transaction);
    setTransactionList([...transactionList, transaction]);
  }

  const me = data?.me.username || "";
  console.log(transactions);
  console.log(me);

  // formatting, "L" MM/DD/YYYY, "M" current month
  const currentDate = moment().format("L");
  const currentMonth = moment().format("M");

  console.log(currentMonth);
  console.log(currentDate);
  // console.log(transactions);

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
        {/* <TransactionList
          transactions={transactions}
          me={me}
          title="All Transactions"
          showTitle={true}
        /> */}
      </div>
      <div className="mt-4">
        <TransactionTable />
      </div>
    </div>
  );
};

export default Transactions;
