import React from 'react';
import { graphql } from 'react-apollo';
import { Font } from 'expo';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { getMessagesNotFoundQuery } from './../../graphql/queries';
import Map from './map.js';
import Activities from './activities.js';
import { connectedUser } from './../login/login.js';
import isInTheArea from './../../locationUtils/isInTheArea.js';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    backgroundColor: '#47ACFF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 35,
    lineHeight: 35
  }
})

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      detectedMessages: [],
      fontLoaded: false
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Home'
  });

  async componentDidMount(){
    await Font.loadAsync({
      'roboto-slab-bold': require('./../../assets/fonts/Roboto_Slab/RobotoSlab-Bold.ttf'),
      'roboto-slab-light': require('./../../assets/fonts/Roboto_Slab/RobotoSlab-Light.ttf'),
      'roboto-slab-regular': require('./../../assets/fonts/Roboto_Slab/RobotoSlab-Regular.ttf'),
      'roboto-slab-thin': require('./../../assets/fonts/Roboto_Slab/RobotoSlab-Thin.ttf'),
    });
    this.setState({fontLoaded: true});
  }

  render(){
    const props = this.props;
    const {data: {loading, error, getMessagesNotFound}} = props;

    if(loading) return <Text>Loading...</Text>
    if(error) return <Text>Error</Text>

    const createMessage = () => {
      props.navigation.navigate('Create');
    }

    const checkWaitingMessages = (position) => {
      if(getMessagesNotFound.length > 0){
        getMessagesNotFound.forEach((message, i) => {
          if(isInTheArea(message, position)){
            if(!this.state.detectedMessages.includes(this.state.detectedMessages.find(m => m.id === message.id))){
              this.setState({detectedMessages: [...this.state.detectedMessages, message]});
            }
          } else if(this.state.detectedMessages.includes(this.state.detectedMessages.find(m => m.id === message.id))){
            const messageIndex = this.state.detectedMessages.findIndex(m => m.id === message.id);
            const newArray = [...this.state.detectedMessages];
            newArray.splice(messageIndex, 1);
            this.setState({detectedMessages: newArray});
          };
        })
      }
    }

    const onDetectedMessageClick = (messageId) => {
      props.navigation.navigate('Message', {messageId: messageId});
    }

    return (
      <View style={styles.container}>
        <Map onDetectedMessageClick={onDetectedMessageClick} detectedMessages={this.state.detectedMessages} onChangePosition={checkWaitingMessages}/>
        {this.state.fontLoaded ?
          <Activities onDetectedMessageClick={onDetectedMessageClick} detectedMessages={this.state.detectedMessages}/>
        : null}
        <TouchableOpacity style={styles.button} onPress={() => createMessage()}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default graphql(getMessagesNotFoundQuery, {
  options: (ownProps) => ({
    variables: {
      userId: connectedUser.id
    }
  })
})(Home);
