import { useContext } from 'react';
import TransactionsContext from '../context/transactionsContext';

function useTransactionsContext() {
    return useContext(TransactionsContext);
}

export default useTransactionsContext;