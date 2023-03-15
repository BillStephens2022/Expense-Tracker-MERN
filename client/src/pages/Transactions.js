import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME, QUERY_TRANSACTIONS } from "../utils/queries";
import { DELETE_TRANSACTION, ADD_TRANSACTION } from "../utils/mutations";
import TransactionForm from "../components/TransactionForm";
import moment from "moment";
import { Modal } from "react-bootstrap";
import TransactionTable from "../components/TransactionTable";
import Auth from "../utils/auth";
import "../styles/Transactions.css";

const Transactions = ({ transactions, setTransactions }) => {
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  // const [transactionList, setTransactionList] = useState([]);
  const [transactionFormState, setTransactionFormState] = useState({
    date: "",
    amount: "",
    highLevelCategory: "Essential",
    category: "Housing",
    description: "",
  });
  // uses moment.js to set start of current week starting on sunday formatted MM/DD/YYYY
  const [startDate, setStartDate] = useState(
    moment().startOf("week").format("L")
  );

  // uses moment.js to set end of current week ending on saturday formatted MM/DD/YYYY
  const [endDate, setEndDate] = useState(moment().endOf("week").format("L"));

  // query transaction data then destructure the transactions from all the data
  const { data, loading, refetch } = useQuery(QUERY_ME);

  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, {
    update(cache, { data: { deleteTransaction } }) {
      try {
        const { transactions } = cache.readQuery({
          query: QUERY_TRANSACTIONS,
        }) ?? { transactions: [] };
  
        const updatedTransactions = transactions.filter(
          (transaction) => transaction._id !== deleteTransaction._id
        );
  
        cache.writeQuery({
          query: QUERY_TRANSACTIONS,
          data: { transactions: updatedTransactions },
        });
  
        const { me } = cache.readQuery({ query: QUERY_ME });
  
        cache.writeQuery({
          query: QUERY_ME,
          data: {
            me: {
              ...me,
              transactions: updatedTransactions,
            },
          },
        });
      } catch (e) {
        console.log("error with mutation!");
        console.error(e);
      }
      
      console.log("updated cache:", cache.data.data);
      refetch();
    },
  });

  const [addTransaction] = useMutation(ADD_TRANSACTION, {
    update(cache, { data: { addTransaction } }) {
      try {
        const { transactions } = cache.readQuery({
          query: QUERY_TRANSACTIONS,
        }) ?? { transactions: [] };

        cache.writeQuery({
          query: QUERY_TRANSACTIONS,
          data: { transactions: [addTransaction, ...transactions] },
        });

        const { me } = cache.readQuery({ query: QUERY_ME });

        cache.writeQuery({
          query: QUERY_ME,
          data: {
            me: { 
              ...me, 
              transactions: [addTransaction, ...me.transactions ],
            },
          },
        });

      } catch (e) {
        console.log("error with mutation!");
        console.error(e);
      }
      
      
      
      console.log("updated cache:", cache.data.data);
    },
    variables: {
      date: transactionFormState.date,
      amount: parseFloat(transactionFormState.amount),
      highLevelCategory: transactionFormState.highLevelCategory,
      category: transactionFormState.category,
      description: transactionFormState.description,
      username: Auth.getProfile().data.username,
    },
  });

  useEffect(() => {
    if (data?.me?.transactions) {
      setTransactions(data?.me?.transactions);
    }
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
      <h1 className="mt-5 mb-5 expense-tracker-header">
        Welcome to your Expense Tracker!
      </h1>

      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body text-dark">
              <h4>Spending for {currentDate}:</h4>
              <p className="text-danger spending">{todaySpending}</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card">
            <div className="card-body text-dark">
              <h4>
                Expenditure for Current Week ({startDate} - {endDate}):
              </h4>
              <p className="text-danger spending">{currentWeekSpending}</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card">
            <div className="card-body text-dark">
              <h4>Expenditure for Current Month:</h4>
              <p className="text-danger spending">{currentMonthSpending}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-5 text-center">
      <h1 id="transaction-table-header">Your Transactions</h1>
        <button
          className="btn add-transaction-button"
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
                    transactionFormState={transactionFormState}
                    setTransactionFormState={setTransactionFormState}
                  />
                </Modal.Body>
              </Modal>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 d-flex justify-content-center">
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
