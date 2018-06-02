import gql from 'graphql-tag';

export default gql`
  mutation requestFriend($from: Int!, $fromUsername: String!, $to: Int!, $toUsername: String!) {
    requestFriend(from: $from, fromUsername: $fromUsername, to: $to, toUsername: $toUsername) {
      id
      from
      fromUsername
      to
      toUsername
      status
    }
  }
`
