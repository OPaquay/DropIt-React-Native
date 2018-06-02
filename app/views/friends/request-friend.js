import React from 'react';
import { Button, AsyncStorage } from 'react-native';
import { graphql } from 'react-apollo';
import { requestFriendMutation } from './../../graphql/mutations';
import { connectedUser } from './../login/login.js';

const RequestFriend = (props) => {

  const requestFriend = () => {
    props.mutate({
      variables: {
        from: connectedUser.id,
        fromUsername: connectedUser.username,
        to: props.target,
        toUsername: props.targetUsername
      }
    })
  }

  return (
    <Button title='+' onPress={() => requestFriend()}/>
  );
}

export default graphql(requestFriendMutation)(RequestFriend);
