import gql from 'graphql-tag';

export default gql`
  mutation registrationMutation($email: String!, $username: String!, $password: String!) {
    registration(email: $email, username: $username, password: $password) {
      id
      email
      username
      error
    }
  }
`
