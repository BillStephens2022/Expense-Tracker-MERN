import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      transactions {
        date
        amount
        highLevelCategory
        category
        description
      }
    }
  }
`;
