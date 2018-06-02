import React from 'react';
import { Text, View, } from 'react-native';
import { graphql } from 'react-apollo';
import { searchFriendsQuery } from './../../graphql/queries';
import RequestFriend from './request-friend.js';

const SearchResults = (props) => {
  const {data: {loading, error, searchFriends}} = props;

  if (loading) return <Text>Loading..</Text>
  if (error) return <Text>Error</Text>

  return (
    <View>
      <Text>Results :</Text>
      {searchFriends.map((user, index) => {
        return (
          <View key={index}>
            <Text>{user.username}</Text>
            <RequestFriend target={user.id} targetUsername={user.username}/>
          </View>
        )
      })}
    </View>
  );
}

export default graphql(searchFriendsQuery, {
  options: (props) => ({
    variables: {
      username: props.username
    }
  })
})(SearchResults);
