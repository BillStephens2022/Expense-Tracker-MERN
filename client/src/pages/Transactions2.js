import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { DELETE_TRANSACTION } from "../utils/mutations";
import TransactionTable from "../components/TransactionTable";

const Transactions2 = () => {
  const { data, loading } = useQuery(QUERY_ME);
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  
  return (
    <div>
      <TransactionTable data={data} loading={loading} onDelete={deleteTransaction}/>
    </div>
  );
};

export default Transactions2;
