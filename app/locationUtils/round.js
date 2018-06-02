const round = (number, X) => {
  X = (!X ? 3 : X);
  return Math.round(number*Math.pow(10,X))/Math.pow(10,X)
}

export default round;
