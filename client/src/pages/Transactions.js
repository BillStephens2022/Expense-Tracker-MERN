import React from "react";
import "../styles/TransactionForm.css";
import TransactionForm from "../components/TransactionForm_old";
import TransactionList from "../components/TransactionList";
import { useQuery } from "@apollo/client";
import { QUERY_TRANSACTIONS } from "../utils/queries";

function Transactions() {
  const { data } = useQuery(QUERY_TRANSACTIONS);
  const transactions = data?.transactions || [];
  return (
    <div className="row">
      <div className="col col-lg-8 col-sm-12">
        <TransactionForm />
      </div>
      {
        <div className="col col-lg-4 col-sm-12">
          <TransactionList
            transactions={transactions}
            title="Your Transactions..."
          />
        </div>
      }
    </div>
  );
}

export default Transactions;
