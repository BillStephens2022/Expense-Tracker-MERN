import { createContext, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { ADD_TRANSACTION, DELETE_TRANSACTION } from "../utils/mutations";

const TransactionsContext = createContext();

function Provider({ children }) {
  const [transactions, setTransactions] = useState([]);

  // uses moment.js to set start of current week starting on sunday formatted MM/DD/YYYY

  // query transaction data then destructure the transactions from all the data

  const { data } = useQuery(QUERY_ME);
  const transactionsData = data?.me.transactions || [];
  setTransactions(transactionsData);

  const [addTransaction] = useMutation(ADD_TRANSACTION);

  const [deleteTransaction] = useMutation(DELETE_TRANSACTION);

  const valueToShare = {
    transactions,
    addTransaction,
    deleteTransaction,
  };

  return (
    <TransactionsContext.Provider value={valueToShare}>
      {children}
    </TransactionsContext.Provider>
  );
}

export { Provider };
export default TransactionsContext;
