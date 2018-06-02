import gql from 'graphql-tag';

export default gql`
  mutation updateFriendRequestStatus($accepted: Boolean!, $requestId: Int!) {
    updateFriendRequestStatus(accepted: $accepted, requestId: $requestId)
  }
`
