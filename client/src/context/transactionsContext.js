import { createContext, useState, useCallback } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_TRANSACTIONS } from "../utils/queries";
import { ADD_TRANSACTION, DELETE_TRANSACTION } from "../utils/mutations";

const TransactionsContext = createContext();

function Provider({ children }) {
  const [transactions, setTransactions] = useState([]);
  // uses moment.js to set start of current week starting on sunday formatted MM/DD/YYYY

  // query transaction data then destructure the transactions from all the data
  const fetchTransactions = useCallback(() => {
    const { data } = useQuery(QUERY_ME);
    transactions = data?.me.transactions || [];
    setTransactions(transactions);
  }, []);

  const [addTransaction] = useMutation(ADD_TRANSACTION);

  const [deleteTransaction] = useMutation(DELETE_TRANSACTION);

  const valueToShare = {
    transactions,
    fetchTransactions,
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
