import React from 'react';
import { Text, View, Button } from 'react-native';
import { graphql } from 'react-apollo';
import { getFriendsQuery } from './../../graphql/queries';
import { connectedUser } from './../login/login.js';

const Recipients = (props) => {
  const {data: {loading, error, getFriends}} = props;

  if(loading) return <Text>Loading..</Text>
  if(error) return <Text>{error.message}</Text>

  return (
    <View>
      {getFriends.map((friend, index) => {
        return (
          <View key={index}>
            <Text>{friend.username}</Text>
            <Button onPress={() => {props.selectRecipient(friend.id);}} title='Select'/>
            <Button onPress={() => {props.unselectRecipient(friend.id);}} title='Unselect'/>
          </View>
        )
      })}
    </View>
  );
}

export default graphql(getFriendsQuery, {
  options: (props) => ({
    variables: {
      userId: connectedUser.id
    }
  })
})(Recipients);
