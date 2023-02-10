import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_TRANSACTIONS = gql`
query transactions {
  transactions {
    amount
    category
    date
    description
    highLevelCategory
    userId
  }
}
`;
