import { createContext, useState, useCallback } from 'react';

const TransactionsContext = createContext();

function Provider({ children }) {
    const [transactions, setTransactions] = useState([]);
};