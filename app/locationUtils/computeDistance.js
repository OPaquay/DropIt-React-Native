import convertRadians from './convertRadians.js';
import round from './round.js';

const computeDistance = (a, b) => {
  a.latRadian = convertRadians(a.latitude);
  a.longRadian = convertRadians(a.longitude);
  b.latRadian = convertRadians(b.latitude);
  b.longRadian = convertRadians(b.longitude);

  let distance = Math.acos(Math.cos(a.latRadian)*Math.cos(b.latRadian)*Math.cos(a.longRadian)*Math.cos(b.longRadian)+Math.cos(a.latRadian)*Math.sin(a.longRadian)*Math.cos(b.latRadian)*Math.sin(b.longRadian)+Math.sin(a.latRadian)*Math.sin(b.latRadian));
  distance = round(6378*distance);
  return ((distance*1000).toFixed(0));
}

export default computeDistance;
