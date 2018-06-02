import gql from 'graphql-tag';

export default gql`
  mutation connectionMutation($username: String!, $password: String!) {
    connection(username: $username, password: $password) {
      id
      username
      error
      email
      firstName
      lastName
    }
  }
`
