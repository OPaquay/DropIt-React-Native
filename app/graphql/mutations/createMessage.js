import gql from 'graphql-tag';

export default gql`
  mutation createMessage($from: Int!, $content: String!, $lat: Float!, $long: Float!, $public: Boolean!, $views: Int!, $recipients: [Int] ) {
    createMessage(from: $from, content: $content, lat: $lat, long: $long, public: $public, views: $views, recipients: $recipients)
  }
`
