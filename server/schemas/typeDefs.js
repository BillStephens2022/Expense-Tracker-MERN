const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    transactions: [Transaction]
  }
  type Transaction {
    transactionId: ID!
    date: String!
    amount: Float!
    highLevelCategory: String!
    category: String!
    description: String
  }
  type Auth {
    token: ID
    user: User
  }
  type Query {
    me: User
  }
  type Mutation {
    addUser(username: String, email: String, password: String): Auth
    login(email: String, password: String): Auth
    saveTransaction(
      _id: ID
      date: String
      amount: Float
      highLevelCategory: String
      category: String
      description: String
    ) : User
    deleteTransaction(_id: ID): User
  }
`;

module.exports = typeDefs;