import gql from 'graphql-tag';

export default gql`
  query getMessagesNotFound($userId: Int!) {
    getMessagesNotFound(userId: $userId){
      id
      from
      content
      date
      lat
      long
      recipients {
        id
        message
        user
        found
      }
    }
  }
`
