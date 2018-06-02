import { StackNavigator } from 'react-navigation';

import Login from './../views/login/login.js';
import Signup from './../views/signup/signup.js';

const LoginStack = StackNavigator(
  {
    Login: {
      screen: Login
    },
    Signup: {
      screen: Signup
    }
  },
  {
    headerMode: 'float',
    navigationOptions: {
      headerStyle: {backgroundColor: '#E73536'},
      headerTintColor: 'white',
      title: 'You are not logged in',
    }
  }
)

export default LoginStack;
