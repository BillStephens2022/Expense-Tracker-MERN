import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { DELETE_TRANSACTION, ADD_TRANSACTION } from "../utils/mutations";
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
  const [transactions, setTransactions] = useState(data?.me.transactions || []);
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION);
  const [addTransaction] = useMutation(ADD_TRANSACTION);

  useEffect(() => {
    setTransactions(data?.me.transactions || []);
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const transactionsData =
    data?.me.transactions.map((transaction) => ({
      ...transaction,
      date: moment.unix(transaction.date / 1000).format("MM/DD/YYYY"),
    })) || [];

  const currentDate = moment().format("L");
  const currentMonth = moment().format("M");

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
      <h1 className="mt-5 expense-tracker-header">
        Welcome to your Expense Tracker!
      </h1>

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
              <h4>
                Expenditure for Current Week ({startDate} - {endDate}):
              </h4>
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
                    setShowTransactionForm={setShowTransactionForm}
                    // addTransactionList={addTransactionList}
                    addTransaction={addTransaction}
                    transactions={transactions}
                    setTransactions={setTransactions}
                  />
                </Modal.Body>
              </Modal>
            </div>
          </div>
        )}
      </div>
      <div className="mt-4">
        <TransactionTable
          data={data}
          loading={loading}
          deleteTransaction={deleteTransaction}
          transactions={transactions}
          setTransactions={setTransactions}
        />
      </div>
    </div>
  );
};

export default Transactions;
