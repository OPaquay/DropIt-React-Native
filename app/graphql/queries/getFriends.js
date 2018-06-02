import gql from 'graphql-tag';

export default gql`
  query getFriends($userId: Int!) {
    getFriends(userId: $userId) {
      id
      username
      requestId
    }
  }
`
