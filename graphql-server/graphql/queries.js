import { Users, Friendship, Messages, MessageRecipient, Activities, ActivitiesParticipants } from './../data/connector.js';
import Sequelize, { Op } from 'sequelize';

export const Query = {
  searchFriends: (root, args) => {
    return Users.findAll({
      where: {
        username: {
          [Op.like]: args.username + '%'
        }
      }
    }).then((data) => {
      let users = [];
      data.forEach((user) => {
        users.push(user.dataValues);
      });
      return users;
    })
  },

  getFriendRequests: (root, args) => {
    return Friendship.findAll({
      where: {
        to: args.userId,
        status: 'pending'
      }
    }).then((data) => {
      let friendRequests = [];
      data.forEach((friendRequest) => {
        friendRequests.push(friendRequest.dataValues);
      })
      return friendRequests;
    })
  },

  getFriends: (root, args) => {
    return Friendship.findAll({
      where: {
        [Op.or]: [
          {
            from: args.userId
          },
          {
            to: args.userId
          }
        ],
        status: 'accepted'
      }
    }).then((data) => {
      let friends = [];
      data.forEach((friend) => {
        let friendObj = {};
        friendObj.requestId = friend.dataValues.id;
        if(friend.dataValues.from !== args.userId){
          friendObj.id = friend.dataValues.from;
          friendObj.username = friend.dataValues.fromUsername;
        } else {
          friendObj.id = friend.dataValues.to;
          friendObj.username = friend.dataValues.toUsername;
        }
        friends.push(friendObj);
      });
      return friends;
    })
  },

  getActivities: (root, args) => {
    return Activities.findAll({
      where: {
        owner: args.userId
      },
      include: [{
        model: ActivitiesParticipants,
        as: 'participants'
      }]
    }).then((data) => {
      let activities = [];
      data.forEach((d => {
        activities.push(d.dataValues);
      }));
      return activities.sort((a, b) => (b.date - a.date));
    })
  },

  getMessagesNotFound: (root, args) => {
    return Messages.findAll({
      include: [{
        model: MessageRecipient,
        as: 'recipients',
        required: true,
        where: {
          user: args.userId,
          found: false
        }
      }]
    }).then((data) => {
      let messages = [];
      data.forEach(d => {
        messages.push(d.dataValues);
      });
      return messages;
    })
  },

  getMessage: (root, args) => {
    return Messages.findOne({
      where: {
        id: args.messageId
      }
    }).then((message) => {
      return message;
    })
  }
}
