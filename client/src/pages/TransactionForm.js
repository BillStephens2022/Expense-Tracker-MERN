import React from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import Auth from '../utils/auth';


const TransactionForm = () => {

  return (
      <div className="transaction-page">
        <div>
          <h1>Enter A Transaction</h1>
        </div>
        <form>
          <input placeholder="Enter an amount"></input>
        </form>
      </div>

  );
};

export default TransactionForm;
