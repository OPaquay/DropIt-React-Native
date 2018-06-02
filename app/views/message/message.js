import React from 'react';
import { Text, View,  } from 'react-native';
import { graphql, compose } from 'react-apollo';
import { getMessageQuery, getMessagesNotFoundQuery } from './../../graphql/queries';
import { findMessageMutation } from './../../graphql/mutations';
import computeDistance from './../../locationUtils/computeDistance.js';
import SearchMessage from './search.js';
import MessageContent from './content.js';
import { MessageView } from './style.js';
import { connectedUser } from './../login/login.js';
import rules from './../../rules.js';

class Message extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userPosition: {
        latitude: null,
        longitude: null
      },
      messagePosition: {
        latitude: null,
        longitude: null
      },
      found: false,
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Message'
  });

  componentDidMount(){
    this.watchPosition = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            userPosition: {latitude: position.coords.latitude, longitude: position.coords.longitude},
          }, () => {

          });
        },
        (error) => {
          console.log(error);
        },
      )
    }, 300)
  }

  componentWillUnmount(){
    clearInterval(this.watchPosition);
  }

  render(){
    const props = this.props;
    const {data: {loading, error, getMessage}} = props;

    if(loading) return <Text>Loading...</Text>
    if(error) return <Text>Error...</Text>

    const getDistance = (userPosition, messagePosition) => {
      return computeDistance(userPosition, messagePosition)
    };
    if(getDistance(this.state.userPosition, {latitude: getMessage.lat, longitude: getMessage.long}) < rules.distanceToFind && this.state.found === false){
      clearInterval(this.watchPosition);
      this.setState({found: true});
      props.mutate({
        variables: {
          messageId: props.navigation.state.params.messageId,
          userId: connectedUser.id
        },
        refetchQueries: [{
          query: getMessagesNotFoundQuery,
          variables: {
            userId: connectedUser.id
          }
        }]
      })
    } else if(this.state.userPosition.latitude !== null && getDistance(this.state.userPosition, {latitude: getMessage.lat, longitude: getMessage.long}) > rules.distanceToDetect){
      console.log(getDistance(this.state.userPosition, {latitude: getMessage.lat, longitude: getMessage.long}));
      clearInterval(this.watchPosition);
      props.navigation.goBack();
    }

    return (
      <MessageView>
        {!this.state.found ?
          <SearchMessage userPosition={this.state.userPosition} messagePosition={{latitude: getMessage.lat, longitude: getMessage.long}} distance={getDistance(this.state.userPosition, {latitude: getMessage.lat, longitude: getMessage.long})}/>
        :
          <MessageContent message={getMessage}/>
        }
      </MessageView>
    );
  }
}

export default compose(
  graphql(getMessageQuery, {
    options: (ownProps) => ({
      variables: {
        messageId: ownProps.navigation.state.params.messageId
      }
    })
  }),
  graphql(findMessageMutation)
)(Message);
