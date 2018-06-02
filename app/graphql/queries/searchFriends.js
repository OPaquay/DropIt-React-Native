import gql from 'graphql-tag';

export default gql`
  query searchFriends($username: String!) {
    searchFriends(username: $username) {
      id
      username
      error
      email
    }
  }
`
