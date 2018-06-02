import React from 'react';
import { Text } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import DrawerNavigation from './drawer.js';
import Public from './../views/public/public.js';
import Create from './../views/create/create.js';
import Recipients from './../views/create/recipients.js';
import AddFriends from './../views/friends/add-friends.js';
import FriendRequests from './../views/friends/friend-requests.js';
import Message from './../views/message/message.js';

const MainStack = StackNavigator(
  {
    DrawerStack: {
      screen: DrawerNavigation
    },
    Public: {
      screen: Public
    },
    Create: {
      screen: Create,
    },
    Recipients: {
      screen: Recipients,
    },
    AddFriends: {
      screen: AddFriends,
    },
    FriendRequests: {
      screen: FriendRequests,
    },
    Message: {
      screen: Message,
    }
  }, {
    headerMode: 'float',
    navigationOptions: {
      headerStyle: {backgroundColor: 'white'},
      headerTintColor: '#47ACFF',
    }
  }
)

export default MainStack;
