import moment from 'moment';

const getTimeElapsed = (date, now) => {

  const timeElapsed = now - date;
  const secondsElapsed = Math.floor(timeElapsed/1000);
  const minutesElapsed = Math.floor(secondsElapsed/60);
  const hoursElapsed = Math.floor(minutesElapsed/60);
  const daysElapsed = Math.floor(hoursElapsed/24);
  const weekElapsed = Math.floor(daysElapsed/7);
  const monthsElapsed = moment(now).diff(moment(date), 'months');
  const yearsElapsed = moment(now).diff(moment(date), 'years');

  switch(true){
    case secondsElapsed < 60:
      return 'Now';
    case minutesElapsed < 60:
      return minutesElapsed === 1 ? 'One minute ago' : minutesElapsed + ' minutes ago';
    case hoursElapsed < 24:
      return hoursElapsed === 1 ? 'One hour ago' : hoursElapsed + ' hours ago';
    case daysElapsed < 7:
      return daysElapsed === 1 ? 'Yesterday' : daysElapsed + ' days ago';
    case monthsElapsed < 1:
      return weekElapsed === 1 ? 'Last week' : weekElapsed + ' weeks ago';
    case yearsElapsed < 1:
      return monthsElapsed === 1 ? 'Last month' : monthsElapsed + ' months ago';
    case yearsElapsed !== 0:
      return yearsElapsed === 1 ? 'Last year' : yearsElapsed + ' years ago';
    default :
      return 'Some light years ago';
  }
}

export default getTimeElapsed;
