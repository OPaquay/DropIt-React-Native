import { StackNavigator } from 'react-navigation';
import LoginStack from './login.js';
import MainStack from './main.js';

const RootStack = StackNavigator(
  {
    LoginStack: {
      screen: LoginStack,
    },
    MainStack: {
      screen: MainStack,
    }
  },
  {
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'LoginStack',
  }
);

export default RootStack;
