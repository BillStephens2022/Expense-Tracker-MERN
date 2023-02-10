import React from "react";
import "../styles/TransactionForm.css";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import { useQuery } from '@apollo/client';
import { QUERY_TRANSACTIONS } from '../utils/queries';


function Transactions() {
  const { data } = useQuery(QUERY_TRANSACTIONS);
  const transactions = data?.transactions || [];
    return (
      <div>
        <TransactionForm />
        {
            <TransactionList
              transactions={transactions}
              title="Your Transactions..."
            />
          }
      </div>
    );
  }
  
  export default Transactions;