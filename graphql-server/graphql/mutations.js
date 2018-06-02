import { Users, Friendship, Messages, MessageRecipient, Activities, ActivitiesParticipants } from './../data/connector.js';

export const Mutation = {
  connection: (root, args) => {
    return Users.findOne({
      where: {
        username: args.username
      }
    }).then((user) => {
      if(!user) {
        const data = {error: 'User not found'};
        return data;
      } else if(args.password !== user.password) {
        const data = { error: 'Wrong password'};
        return data;
      }
      return user;
    })
  },

  registration: (root, args) => {
    return Users.findOne({
      where: {
        username: args.username
      }
    }).then((user) => {
      if(!user) {
        return Users.create({
          email: args.email,
          username: args.username,
          password: args.password
        }).then((user) => {
          return user;
        })
      } else {
        const data = {error: 'Username already used'};
        return data;
      }
    })
  },

  requestFriend: (root, args) => {
    return Friendship.create({
      from: args.from,
      fromUsername: args.fromUsername,
      to: args.to,
      toUsername: args.toUsername,
      status: 'pending',
      date: Date.now()
    }).then((request) => {
      return Activities.create({
        owner: args.to,
        type: 'friend_request',
        relatedTo: request.id,
        date: Date.now()
      }).then((activity) => {
        return ActivitiesParticipants.create({
          activity: activity.id,
          user: args.from
        });
      });
    })
  },

  updateFriendRequestStatus: (root, args) => {
    let status = args.accepted ? 'accepted' : 'refused';
    return Friendship.update({
      status: status
    }, {
      where: {
        id: args.requestId
      }
    }).then((data) => {
      return Friendship.findOne({
        where: {
          id: args.requestId
        }
      }).then((friendship) => {
        if(args.accepted){
          return Activities.create({
            owner: friendship.from,
            type: 'friend_request_accepted_by',
            relatedTo: friendship.id,
            date: Date.now()
          }).then((activity) => {
            return ActivitiesParticipants.create({
              activity: activity.id,
              user: friendship.to
            }).then((data) => {
              return Activities.create({
                owner: friendship.to,
                type: 'friend_request_accepted',
                relatedTo: friendship.id,
                date: Date.now()
              }).then((activity) => {
                return ActivitiesParticipants.create({
                  activity: activity.id,
                  user: friendship.from
                }).then((data)=>{
                  return true;
                })
              })
            })
          })
        } else {
          return true;
        }
      })
    })
  },

  createMessage: (root, args) => {
    return Messages.create({
      from: args.from,
      content: args.content,
      lat: args.lat,
      long: args.long,
      public: args.public ? 1 : 0,
      views: args.views,
      date: Date.now()
    }).then((message) => {
      return Activities.create({
        owner: args.from,
        type: 'message_sent',
        relatedTo: message.id,
        date: Date.now()
      }).then((activity) => {
        let promises = [];
        args.recipients.forEach((recipient) => {
          let newPromise = MessageRecipient.create({
            message: message.id,
            user: recipient,
            found: 0
          })
          promises.push(newPromise);
          let otherPromise = ActivitiesParticipants.create({
            activity: activity.id,
            user: recipient
          })
          promises.push(otherPromise);
        });
        return Promise.all(promises).then((messageRecipients) => {
          return true;
        })
      })
    })
  },

  findMessage: (root, args) => {
    return MessageRecipient.update({
      found: true
    }, {
      where: {
        message: args.messageId,
        user: args.userId
      }
    }).then((data) => {
      MessageRecipient.findOne({
        where: {
          message: args.messageId,
          user: args.userId
        },
        include: [{
          model: Messages,
          as: 'messages'
        }]
      }).then((messageRecipient) => {
        Activities.create({
          owner: args.userId,
          type: 'message_found',
          relatedTo: messageRecipient.messages.dataValues.id,
          date: Date.now()
        }).then((activity) => {
          ActivitiesParticipants.create({
            activity: activity.id,
            user: messageRecipient.messages.dataValues.from
          }).then((participant) => {
            Activities.create({
              owner: messageRecipient.messages.dataValues.from,
              type: 'message_found_by',
              relatedTo: messageRecipient.messages.dataValues.id,
              date: Date.now()
            }).then((activity) => {
              ActivitiesParticipants.create({
                activity: activity.id,
                user: args.userId
              }).then(() => {
                return true;
              })
            })
          })
        })
      })
    })
  }
}
