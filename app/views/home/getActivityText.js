import connectedUser from './../login/login.js';

const getFriendRequestText = (activity, friendRequests, friends) => {
  let baseText = ' sent you a friend request';
  let friendRequest = friendRequests.find(f => f.id === activity.relatedTo);
  if(friendRequest) {
    let username = friendRequest.from === connectedUser.id ? friendRequest.toUsername : friendRequest.fromUsername;
    return username + baseText;
  } else {
    let friend = friends.find(f => f.requestId === activity.relatedTo);
    return friend.username + baseText;
  }
}

const getFriendRequestAcceptedText = (activity, friends) => {
  let friend = friends.find(f => activity.relatedTo === f.requestId);
  return friend.username + ' is now your friend';
}

const getMessageSentText = (activity, friends) => {
  let baseText = 'Message dropped for ';
  activity.participants.forEach((participant, i) => {
    let participantUsername = friends.find(f => f.id === participant.user).username;
    baseText += participantUsername;
    if(i < activity.participants.length - 1) {
      if(i === activity.participants.length - 2){
        baseText += ' & '
      } else {
        baseText += ', '
      }
    }
  });
  return baseText;
}

const getMessageFoundByText = (activity, friends) => {
  let username = friends.find(f => f.id === activity.participants[0].user).username;
  return username + ' found your message';
}

getMessageFoundText = (activity, friends) => {
  let username = friends.find(f => f.id === activity.participants[0].user).username;
  return 'You found a message from ' + username;
}

export default (activity, friends, friendRequests) => {
  switch(activity.type) {
    case 'friend_request':
      return getFriendRequestText(activity, friendRequests, friends);
    case 'friend_request_accepted':
      return getFriendRequestAcceptedText(activity, friends);
    case 'friend_request_accepted_by':
      return getFriendRequestAcceptedText(activity, friends);
    case 'message_sent':
      return getMessageSentText(activity, friends);
    case 'message_found':
      return getMessageFoundText(activity, friends);
    case 'message_found_by':
      return getMessageFoundByText(activity, friends);
    default:
      return 'Message detected in the area'
  }
}
