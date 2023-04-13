import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Transactions from "./pages/Transactions";
import TransactionForm from "./components/TransactionForm";
import Analysis from "./pages/Analysis";
import Footer from "./components/Footer";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  const [transactions, setTransactions] = useState([]);
  
  return (
    <ApolloProvider client={client}>
      <Router basename={process.env.PUBLIC_URL}>
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/transactions"
              element={<Transactions transactions={transactions} setTransactions={setTransactions} />}
            />
            <Route
              path="/transactions/add"
              element={
                <TransactionForm />
              }
            />
            <Route
              path="/analysis"
              element={<Analysis transactions={transactions} setTransactions={setTransactions} />}
            />
            <Route
              path="*"
              element={<h1 className="display-2">Wrong page!</h1>}
            />
          </Routes>
          <Footer />
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
