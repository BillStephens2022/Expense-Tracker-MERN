import React from "react";
import "../styles/TransactionForm.css";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import { useQuery } from '@apollo/client';
import { QUERY_TRANSACTIONS, QUERY_ME } from '../utils/queries';


function Transactions() {
  const { data } = useQuery(QUERY_ME);
  const transactions = data?.me.transactions || [];
  const me = data?.me.username || [];
  console.log(me);
  
    return (
      <div className="row">
        <div className="col col-lg-8 col-sm-12">
        <TransactionForm />
        </div>
        {
          <div className="col col-lg-4 col-sm-12">
            <TransactionList
              transactions={transactions}
              me={me}
              title="Your Transactions..."
            />
            </div>
          }
      </div>
    );
  }
  
  export default Transactions;