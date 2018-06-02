import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  }
})

const Lock = (props) => {
  return(
    <TouchableOpacity style={styles.button} onPress={() => props.lockPosition(!props.isLocked)}>
      <Text style={styles.buttonText}>{props.isLocked ? 'unlock' : 'lock'}</Text>
    </TouchableOpacity>
  );
}

export default Lock;
