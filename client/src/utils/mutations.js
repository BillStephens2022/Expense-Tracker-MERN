import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_TRANSACTION = gql`
mutation addTransaction($date: String!, $amount: Float!, $highLevelCategory: String!, $category: String!, $description: String!, $username: String) {
  addTransaction(date: $date, amount: $amount, highLevelCategory: $highLevelCategory, category: $category, description: $description, username: $username) {
    _id
    amount
    category
    date
    description
    highLevelCategory
    username
  }
}
`;

export const DELETE_USER = gql`
  mutation deleteUser($username: String!, $email: String!, $password: String!) {
    deleteUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
