import React from 'react';
import { Text, View, AsyncStorage } from 'react-native';

export default class DrawerContainer extends React.Component {

  render(){
    const props = this.props;

    const logout = () => {
      AsyncStorage.removeItem('user');
      props.navigation.navigate('Login');
    }

    return (
      <View>
        <Text style={{padding: 10}} onPress={() => props.navigation.navigate('Home')}>Home</Text>
        <Text style={{padding: 10}} onPress={() => {props.navigation.navigate('DrawerClose'); props.navigation.navigate('Public');}}>Public</Text>
        <Text style={{padding: 10}} onPress={() => {props.navigation.navigate('DrawerClose'); props.navigation.navigate('AddFriends');}}>Add friends</Text>
        <Text style={{padding: 10}} onPress={() => {props.navigation.navigate('DrawerClose'); props.navigation.navigate('FriendRequests');}}>Friend requests</Text>
        <Text style={{padding: 10}} onPress={() => {logout();}}>Log out</Text>
      </View>
    );
  }
}
