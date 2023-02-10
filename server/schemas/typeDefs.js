const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
  }
  type Transaction {
    date: String
    amount: Float
    highLevelCategory: String
    category: String
    description: String
    userId: String
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
      date: String
      amount: Float
      highLevelCategory: String
      category: String
      description: String
      userId: String
    ) : Transaction
    deleteTransaction(_id: ID): Transaction
  }
`;

module.exports = typeDefs;