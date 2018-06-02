import React from 'react';
import { graphql } from 'react-apollo';
import { registrationMutation } from './../../graphql/mutations';
import { Text, View, TextInput, Button } from 'react-native';
import validateSignupForm from './../../utils/forms/validateSignupForm.js';

class Signup extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      passwordConfirm: '',
      errors: []
    }
  }

  static navigationOptions = {
    title: 'Signup'
  };

  render(){

    const props = this.props;

    const signUp = () => {
      const formValidation = validateSignupForm(this.state);
      this.setState({errors: formValidation.errors});
      if(formValidation.type === 'success'){
        props.mutate({
          variables: {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
          }
        }).then((data) => {
          const result = data.data.registration;
          if(!result.error){
            props.navigation.navigate('MainStack');
          } else {
            const errors = {username: result.error}
            this.setState({errors: errors})
          }
        }).catch((error) => {
          console.log(error);
        })
      }
    }

    return (
      <View>
        <Text>Email :</Text>
        <TextInput style={{height: 40, borderColor: 'grey', borderWidth: 1}} onChangeText={(email) => this.setState({email})} value={this.state.email}/>
        <Text>{this.state.errors.email}</Text>

        <Text>Username :</Text>
        <TextInput style={{height: 40, borderColor: 'grey', borderWidth: 1}} onChangeText={(username) => this.setState({username})} value={this.state.username}/>
        <Text>{this.state.errors.username}</Text>

        <Text>Password :</Text>
        <TextInput style={{height: 40, borderColor: 'grey', borderWidth: 1}} onChangeText={(password) => this.setState({password})} value={this.state.password}/>
        <Text>{this.state.errors.password}</Text>

        <Text>Confirm password :</Text>
        <TextInput style={{height: 40, borderColor: 'grey', borderWidth: 1}} onChangeText={(passwordConfirm) => this.setState({passwordConfirm})} value={this.state.passwordConfirm}/>
        <Text>{this.state.errors.passwordConfirm}</Text>
        <Button onPress={() => signUp()} title='Sign up'/>
      </View>
    );
  }
}

export default graphql(registrationMutation)(Signup);
