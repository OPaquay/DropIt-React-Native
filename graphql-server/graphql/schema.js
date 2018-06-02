import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers.js';

const typeDefs = `
  type Query {
     searchFriends(username: String!): [User]
     getFriends(userId: Int!): [Friend]
     getFriendRequests(userId: Int!): [FriendRequest]
     getActivities(userId: Int!): [Activity]
     getMessagesNotFound(userId: Int!): [Message]
     getMessage(messageId: Int!): Message
  }

  type User {
    id: Int
    username: String
    email: String
    firstName: String
    lastName: String
    error: String
  }

  type Friend {
    id: Int
    username: String
    requestId: Int
  }

  type FriendRequest {
    id: Int
    from: Int
    fromUsername: String
    to: Int
    toUsername: String
    status: String
  }

  type Activity {
    id: Int
    owner: Int
    type: String
    date: String
    participants: [Participant]
    relatedTo: Int
  }

  type Participant {
    id: Int
    activity: Int
    user: Int
  }

  type Message {
    id: Int!
    from: Int!
    date: String!
    content: String!
    lat: Float!
    long: Float!
    recipients: [Recipient]
  }

  type Recipient {
    id: Int!
    message: Int!
    user: Int!
    found: Boolean!
  }

  type Mutation {
    connection(username: String!, password: String!): User
    registration(email: String!, username: String!, password: String!): User
    requestFriend(from: Int!, fromUsername: String!, to: Int!, toUsername: String!): FriendRequest
    updateFriendRequestStatus(accepted: Boolean!, requestId: Int!): Boolean
    createMessage(from: Int!, content: String!, lat: Float!, long: Float!, public: Boolean!, views: Int!, recipients: [Int]): Boolean
    findMessage(messageId: Int!, userId: Int!): Boolean
  }
`;
const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
