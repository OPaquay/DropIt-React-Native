import React from 'react';
import { Image, Dimensions  } from 'react-native';
import { AnimatedGradient } from './style.js';
import rules from './../../rules.js';

const calculateOffset = (coldestOffset, actualDistance) => {
  const maxDistance = rules.distanceToDetect - rules.distanceToFind;
  const minDistance = 0;
  const distanceRatio = actualDistance/maxDistance;
  const offset = coldestOffset*distanceRatio;
  return offset;
}

class Gradient extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      image: {
        width: 0,
        height: 0
      },
      viewport: {
        height: Dimensions.get('window').height
      }
    }
  }

  componentDidMount(){
    Image.getSize('http://www.oliviapaquay.be/dropit/images/gradient.png',
    (width, height) => {
      this.setState({image: {width: width, height: height}});
    },
    (error) => {
      console.log(error);
    });
  }

  render(){
    const props = this.props;
    const realOffset = this.state.image.height - this.state.viewport.height;
    const offset = realOffset < 0 ? 0 : calculateOffset(realOffset, props.distance);

    return (
      <AnimatedGradient height={this.state.image.height} offset={offset} source={{uri: 'http://www.oliviapaquay.be/dropit/images/gradient.png'}}/>
    );
  }
}

export default Gradient;
