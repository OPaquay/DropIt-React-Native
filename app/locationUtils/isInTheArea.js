import computeDistance from './computeDistance.js';
import rules from './../rules.js';

const isInTheArea = (message, userPosition) => {
  const messagePosition = {latitude: message.lat, longitude: message.long};
  const distanceFromMessage = computeDistance(userPosition, messagePosition);
  if(distanceFromMessage <= rules.distanceToDetect){
    return true;
  } else {
    return false;
  }
}

export default isInTheArea;
