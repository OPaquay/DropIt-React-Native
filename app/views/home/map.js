import React from 'react';
import { Text, StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 250
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 250
  }
})

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0062;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Map extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      region: {
        latitude: 50.84,
        longitude: 4.35,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
    }
  }

  componentDidMount(){
    this.watchPosition = setInterval(() => {
      if("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if(position.coords.latitude !== this.state.region.latitude ||
            position.coords.longitude !== this.state.region.longitude){
              this.props.onChangePosition(position.coords);
            }
            this.setState({region: {latitude: position.coords.latitude, longitude: position.coords.longitude, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA}})
          },
          (error) => {
            console.log(error);
          },
        )
      }
    }, 300)
  }

  componentWillUnmount(){
    clearInterval(this.watchPosition);
  }

  render(){
    const props = this.props;

    return (
      <View style={styles.container}>
        <MapView style={styles.map} initialRegion={this.state.region} region={this.state.region}>
          <Marker coordinate={{latitude: this.state.region.latitude, longitude: this.state.region.longitude}} image={'http://oliviapaquay.be/dropit/images/blue_marker.png'}/>
          {props.detectedMessages.map((message, index) => {
            return (
              <Marker onPress={() => props.onDetectedMessageClick(message.id)} key={index} coordinate={{latitude: message.lat, longitude: message.long}} image={'http://oliviapaquay.be/dropit/images/yellow_marker.png'}/>
            )
          })}
        </MapView>
        </View>
    );
  }
}
