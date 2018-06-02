import React from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { graphql } from 'react-apollo';
import { createMessageMutation } from './../../graphql/mutations';
import Map from './map.js';
import Recipients from './recipients.js';
import { connectedUser } from './../login/login.js';

class Create extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      content: '',
      recipients: [],
      step: 'content',
      position: {
        lat: '',
        long: ''
      },
      public: false,
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Create message'
  });

  render(){

    const props = this.props;

    const selectRecipient = (friendId) => {
      this.state.recipients.push(friendId);
    }

    const unselectRecipient = (friendId) => {
      let index = this.state.recipients.findIndex(r => r === friendId);
      this.state.recipients.splice(index, 1);
    }

    const createMessage = () => {
      let message = {
        from: connectedUser.id,
        content: this.state.content,
        lat: this.state.position.lat,
        long: this.state.position.long,
        public: this.state.public,
        views: 0,
        recipients: this.state.recipients
      }
      props.mutate({
        variables: message
      })
    }

    const setPosition = (position) => {
      this.setState({position: position});
    }

    return (
      <View>
        <Map setPosition={setPosition}/>
        {this.state.step === 'content' ?
          <View>
            <TextInput style={{height: 40, borderColor: 'grey', borderWidth: 1}} onChangeText={(content) => this.setState({content})} value={this.state.content}/>
            <Button onPress={() => {this.setState({step: 'recipients'})}} title='Suivant'/>
          </View>
        :
          <View>
            <Recipients selectRecipient={selectRecipient} unselectRecipient={unselectRecipient}/>
            <Button onPress={() => {createMessage();}} title='Send'/>
          </View>
        }
      </View>
    );
  }
}

export default graphql(createMessageMutation)(Create);
