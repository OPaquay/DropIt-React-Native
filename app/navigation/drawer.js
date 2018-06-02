import React from 'react';
import { Text } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import DrawerContainer from './../views/menu/menu.js';

import Home from './../views/home/home.js';

const DrawerStack = DrawerNavigator(
  {
    Home: {
      screen: Home
    }
  }, {
    contentComponent: DrawerContainer
  }
)

const DrawerNavigation = StackNavigator(
  {
    DrawerStack: {
      screen: DrawerStack
    },
  }, {
    headerMode: 'none',
    navigationOptions: ({navigation}) => ({
      title: 'Drop it',
      headerLeft: <Text style={{color: '#47ACFF'}} onPress={() => {
        if(navigation.state.index === 0) {
          navigation.navigate('DrawerOpen')
        } else {
          navigation.navigate('DrawerClose')
        }
      }}>Menu</Text>,
      headerRight: <Text style={{color: '#47ACFF'}} onPress={() => navigation.navigate('Public')}>Public</Text>
    })
  }
)

export default DrawerNavigation;
