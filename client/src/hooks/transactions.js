import { useContext } from 'react';
import TransactionsContext from '../context/transactions';

function useTransactionsContext() {
    return useContext(TransactionsContext);
}

export default useTransactionsContext;