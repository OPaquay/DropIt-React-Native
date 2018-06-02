import React from 'react';
import { Text, StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Lock from './lock.js';

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
const LATITUDE_DELTA = 0.0018;
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
      },
      isLocked: true,
      located: false,
    }
  }

  componentDidMount(){
    this.watchPosition = setInterval(() => {
      if(!this.state.isLocked || this.state.located === false){
        if("geolocation" in navigator){
          navigator.geolocation.getCurrentPosition(
            (position) => {
              this.setState({located: true, region: {latitude: position.coords.latitude, longitude: position.coords.longitude, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA}})
              this.props.setPosition({lat: position.coords.latitude, long: position.coords.longitude});
            },
            (error) => {
              console.log(error);
            },
          )
        }
      }
    }, 300)
  }

  componentWillUnmount(){
    clearInterval(this.watchPosition);
  }

  render(){
    const lockPosition = (lock) => {
      this.setState({isLocked: lock});
    }

    return (
      <View style={styles.container}>
        <MapView style={styles.map} initialRegion={this.state.region} region={this.state.region}>
          <Marker coordinate={{latitude: this.state.region.latitude, longitude: this.state.region.longitude}} image={'http://oliviapaquay.be/dropit/images/marker.png'}/>
        </MapView>
        <Lock isLocked={this.state.isLocked} lockPosition={lockPosition}/>
      </View>
    );
  }
}
