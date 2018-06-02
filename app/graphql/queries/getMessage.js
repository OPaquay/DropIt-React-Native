import gql from 'graphql-tag';

export default gql`
  query getMessage($messageId: Int!) {
    getMessage(messageId: $messageId){
      id
      from
      content
      date
      lat
      long
    }
  }
`
