import gql from 'graphql-tag';

export default gql`
  query getFriendRequests($userId: Int!) {
    getFriendRequests(userId: $userId) {
      id
      from
      fromUsername
      to
      toUsername
      status
    }
  }
`
