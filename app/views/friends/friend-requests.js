import React from 'react';
import { Text, View, Button } from 'react-native';
import { graphql, compose } from 'react-apollo';
import { getFriendRequestsQuery } from './../../graphql/queries';
import { answerFriendRequestMutation } from './../../graphql/mutations';
import { connectedUser } from './../login/login.js';

class FriendRequests extends React.Component {
  constructor(props){
    super(props);
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Friend requests'
  });

  render(){
    const props = this.props;
    const {data: {loading, error, getFriendRequests}} = props;

    if(loading) return <Text>Loading...</Text>
    if(error) return <Text>Error</Text>

    const answerRequest = (accepted, requestId) => {
      props.mutate({
        variables: {
          accepted: accepted,
          requestId: requestId
        }
      }).then((data) => {
        console.log(data);
      }).catch((error) => {
        console.log(error);
      })
    }

    return (
      <View>
        <Text>Friend requests :</Text>
        {getFriendRequests.map((friendRequest, index) => {
          return (
            <View key={index}>
              <Text>{friendRequest.fromUsername}</Text>
              <Button onPress={() => answerRequest(true, friendRequest.id)} title='Accept'/>
              <Button onPress={() => answerRequest(false, friendRequest.id)} title='Refuse'/>
            </View>
          )
        })}
      </View>
    );
  }
}

export default compose(
  graphql(getFriendRequestsQuery, {
    options: (props) => ({
      variables: {
        userId: connectedUser.id
      }
    })
  }),
  graphql(answerFriendRequestMutation)
)(FriendRequests);
