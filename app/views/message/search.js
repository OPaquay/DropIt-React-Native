import React from 'react';
import { Text, View, Image } from 'react-native';
import { Location } from 'expo';
import { ShowDirection, SearchContainer, StyledImage, Distance } from './style.js';
import computeHeading from './../../locationUtils/computeHeading.js';
import Gradient from './gradient.js';

class SearchMessage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bearing: 0,
      headingToMessage: 0,
      phoneHeading: 0
    };
  }

  async componentDidMount(){
    this.setState({headingToMessage: computeHeading(this.props.userPosition, this.props.messagePosition)});
    this.watchHeading = await Location.watchHeadingAsync((data) => {
      this.setState({phoneHeading: data.trueHeading})
    })
  }

  componentWillUnmount(){
    this.watchHeading.remove();
  }

  render(){
    const props = this.props;
    if(computeHeading(this.props.userPosition, this.props.messagePosition) !== this.state.headingToMessage){
      this.setState({headingToMessage: computeHeading(this.props.userPosition, this.props.messagePosition)});
    }
    return (
      <SearchContainer>
        <Gradient distance={props.distance}/>
        <Distance>{props.distance}m</Distance>
        <ShowDirection bearing={this.state.headingToMessage - this.state.phoneHeading}>
          <StyledImage source={{uri: 'http://www.oliviapaquay.be/dropit/images/direction.png'}}/>
        </ShowDirection>
      </SearchContainer>
    );
  }
}

export default SearchMessage;
