const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    transactions: [Transaction]
  }
  type Transaction {
    _id: ID
    date: String
    amount: Float
    highLevelCategory: String
    category: String
    description: String
  }
  type Auth {
    token: ID
    user: User
  }
  type Query {
    me: User
    transactions: [Transaction]
  }
  type Mutation {
    addUser(username: String, email: String, password: String): Auth
    login(email: String, password: String): Auth
    addTransaction(
      date: String!
      amount: Float!
      highLevelCategory: String!
      category: String!
      description: String!
    ) : Transaction
    deleteTransaction(transactionId: ID!): Transaction
  }
`;

module.exports = typeDefs;