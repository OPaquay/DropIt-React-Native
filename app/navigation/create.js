import { StackNavigator } from 'react-navigation';

import Create from './../views/create/create.js';
import Recipients from './../views/create/recipients.js';

const CreateStack = StackNavigator(
  {
    Create: {
      screen: Create,
    },
    Recipients: {
      screen: Recipients,
    }
  },
  {
    headerMode: 'none',
  }
)

export default CreateStack;
