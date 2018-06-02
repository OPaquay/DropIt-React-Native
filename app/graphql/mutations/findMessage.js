import gql from 'graphql-tag';

export default gql`
  mutation findMessage($messageId: Int!, $userId: Int!) {
    findMessage(messageId: $messageId, userId: $userId)
  }
`
