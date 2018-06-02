import convertRadians from './convertRadians.js';

const computeHeading = (origin, destination) => {
  const pi = 3.1415;
  const originLat = convertRadians(origin.latitude);
  const originLng = convertRadians(origin.longitude);
  const destinationLat = convertRadians(destination.latitude);
  const destinationLng = convertRadians(destination.longitude);

  let dLng = destinationLng - originLng;

  const dPhi = Math.log(Math.tan(destinationLat/2.0 + Math.PI/4.0)/Math.tan(originLat/2.0 + Math.PI/4.0));
  if(Math.abs(dLng) > Math.PI) {
    if(dLng > 0.0) {
      dLng = -(2.0 * Math.PI - dLng);
    } else {
      dLng = (2.0 * Math.PI + dLng);
    }
  }

  const brng = (((Math.atan2(dLng, dPhi)) * (180/Math.PI)) + 360.0) % 360.0;

  return brng;
}

export default computeHeading;
