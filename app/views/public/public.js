import React from 'react';
import { Text, View, Button } from 'react-native';

export default class Public extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Public'
  });

  render(){
    return (
      <View>
        <Text>Public</Text>
      </View>
    );
  }
}
