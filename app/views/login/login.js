import React from 'react';
import { TextInput, View, Button, Text, AsyncStorage } from 'react-native';
import { graphql } from 'react-apollo';
import { connectionMutation } from './../../graphql/mutations';

export let connectedUser = {};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: ''
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Login',
    headerLeft: null,
    gesturesEnabled: false
  });

  signIn(){
    if(this.state.username !== '' && this.state.password !== ''){
      this.props.mutate({
        variables: {
          username: this.state.username,
          password: this.state.password
        }
      }).then((data) => {
        const result = data.data.connection;
        result.password = this.state.password;
        if(!result.error){
          connectedUser = result;
          AsyncStorage.setItem('user', JSON.stringify(result));
          this.props.navigation.navigate('DrawerStack');
        } else {
          this.setState({error: result.error});
        }
      }).catch((error) => {
        console.log(error)
      })
    } else {
      if(this.state.usename === ''){
        this.setState({})
      }
    }
  }

  componentDidMount(){
    AsyncStorage.getItem('user').then((user) => {
      if(user !== null){
        let parsedUser = JSON.parse(user);
        this.setState({username: parsedUser.username, password: parsedUser.password})
        this.signIn();
      }
    })
  }

  render(){
    const props = this.props;

    return (
      <View>
        <TextInput style={{height: 40, borderColor: 'grey', borderWidth: 1}} onChangeText={(username) => this.setState({username})} value={this.state.username}/>
        <TextInput style={{height: 40, borderColor: 'grey', borderWidth: 1}} onChangeText={(password) => this.setState({password})} value={this.state.password}/>
        <Text>{this.state.error}</Text>
        <Button onPress={() => this.signIn()} title='Log in'/>
        <Button onPress={() => props.navigation.navigate('Signup')} title='Sign up'/>
    </View>
    );
  }
}

export default graphql(connectionMutation)(Login)
