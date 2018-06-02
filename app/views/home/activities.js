import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { graphql, compose } from 'react-apollo';
import { getActivitiesQuery, getFriendsQuery, getFriendRequestsQuery } from './../../graphql/queries';
import { connectedUser } from './../login/login.js';
import getActivityText from './getActivityText.js';
import { ListContainer, List, ListElement, BulletPoint, Activity, Time } from './style.js';
import getTimeElapsed from './../../utils/time/getTimeElapsed.js';
import Title from './../../components/title.js';

const Activities = (props) => {
  const { activitiesData, friendsData, friendRequestsData } = props;

  if(activitiesData.loading || friendsData.loading || friendRequestsData.loading) return <Text>Loading...</Text>
  if(activitiesData.error || friendsData.error || friendRequestsData.error) return <Text>Error...</Text>

  const activities = [...activitiesData.getActivities, ...props.detectedMessages];
  const friends = friendsData.getFriends;
  const friendRequests = friendRequestsData.getFriendRequests;

  let sortedActivities = activities.sort((a, b) => {
    if(!a.type){
      return -1;
    } else {
      return 0;
    }
  })
  return(
    <ListContainer>
      <List data={sortedActivities} renderItem={({item, index}) => (
        <View key={index}>
          {index === 0 ? <Title title='Activities'/> : null}
          <ListElement lastChild={index === sortedActivities.length - 1} firstChild={index === 0}>
            <BulletPoint yellow={item.__typename === 'Message'} lastChild={index === sortedActivities.length - 1} firstChild={index === 0}/>
            <Activity bold={item.__typename === 'Message'} onPress={() => !item.type ? props.onDetectedMessageClick(item.id) : null}>{getActivityText(item, friends, friendRequests)}</Activity>
            {item.__typename !== 'Message' ? <Time>{getTimeElapsed(item.date, Date.now())}</Time> : null}
          </ListElement>
        </View>
      )}/>
    </ListContainer>
  );
}

export default compose(
  graphql(getActivitiesQuery, {
    options: (props) => ({
      variables: {
        userId: connectedUser.id
      }
    }),
    name: 'activitiesData'
  }),
  graphql(getFriendsQuery, {
    options: (props) => ({
      variables: {
        userId: connectedUser.id
      }
    }),
    name: 'friendsData'
  }),
  graphql(getFriendRequestsQuery, {
    options: (props) => ({
      variables: {
        userId: connectedUser.id
      }
    }),
    name: 'friendRequestsData'
  })
)(Activities);
