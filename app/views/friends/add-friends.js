import React from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import SearchResults from './search-results.js';

class AddFriends extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      searchInput: ''
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Add friends'
  });

  render(){
    const props = this.props;

    const searchFriends = () => {
      this.setState({searchInput: this.state.username})
    }

    return (
      <View>
        <TextInput style={{height: 40, borderColor: 'grey', borderWidth: 1}} onChangeText={(username) => this.setState({username})} value={this.state.username}/>
        <Button onPress={() => searchFriends()} title='Search'/>
        {this.state.searchInput.length > 2 ? <SearchResults username={this.state.searchInput}/> : null}
      </View>
    );
  }
}

export default AddFriends;
