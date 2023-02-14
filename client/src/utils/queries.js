import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query me {
  me {
    _id
    email
    username
    transactions {
      _id
      amount
      category
      date
      description
      highLevelCategory
    }
  }
}
`;

export const QUERY_TRANSACTIONS = gql`
query transactions {
  transactions {
    _id
    date
    amount
    highLevelCategory
    category
    description
  }
}
`;

export const QUERY_TESTIMONIALS = gql`
  query testimonials {
    testimonials {
      username
      date
      review
    }
  }
`;
