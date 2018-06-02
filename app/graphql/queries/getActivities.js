import gql from 'graphql-tag';

export default gql`
  query getActivities($userId: Int!) {
    getActivities(userId: $userId){
      id
      type
      date
      relatedTo
      participants {
        id
        activity
        user
      }
    }
  }
`
