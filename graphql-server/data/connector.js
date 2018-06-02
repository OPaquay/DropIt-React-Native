import Sequelize from 'sequelize';
import casual from 'casual';
import _ from 'lodash';
import mysql from 'mysql';

const db = new Sequelize('dropit--', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  port: '8889',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

const Users = db.define('dropit-users', {
  id: { type: Sequelize.INTEGER, field: 'id', autoIncrement: true, primaryKey: true},
  username: { type: Sequelize.STRING, field: '_username' },
  password: { type: Sequelize.STRING, field: '_password'},
  email: { type: Sequelize.STRING, field: '_email'},
  firstName: { type: Sequelize.STRING, field: '_first_name' },
  lastName: { type: Sequelize.STRING, field: '_last_name' },
}, {
  freezeTableName: true,
  timestamps: false
})

const Friendship = db.define('friendship', {
  id: { type: Sequelize.INTEGER, field: 'id', autoIncrement: true, primaryKey: true},
  date: { type: Sequelize.STRING, field: '_date' },
  from: { type: Sequelize.STRING, field: '_from' },
  fromUsername: { type: Sequelize.STRING, field: '_from_username'},
  to: { type: Sequelize.STRING, field: '_to' },
  toUsername: { type: Sequelize.STRING, field: '_to_username'},
  status: { type: Sequelize.STRING, field: '_status' },
}, {
  freezeTableName: true,
  timestamps: false
})

const Messages = db.define('dropit-messages', {
  id: { type: Sequelize.INTEGER, field: 'id', autoIncrement: true, primaryKey: true},
  from: { type: Sequelize.STRING, field: '_from' },
  date: { type: Sequelize.STRING, field: '_date' },
  content: { type: Sequelize.STRING, field: '_content' },
  lat: { type: Sequelize.FLOAT, field: '_lat' },
  long: { type: Sequelize.FLOAT, field: '_long' },
  public: { type: Sequelize.BOOLEAN, field: '_public'},
  views: { type: Sequelize.INTEGER, field: '_views' },
}, {
  freezeTableName: true,
  timestamps: false
})

const MessageRecipient = db.define('dropit-message-recipient', {
  id: { type: Sequelize.INTEGER, field: 'id', autoIncrement: true, primaryKey: true},
  message: { type: Sequelize.INTEGER, field: '_message' },
  user: { type: Sequelize.INTEGER, field: '_user' },
  found: { type: Sequelize.BOOLEAN, field: '_found'},
}, {
  freezeTableName: true,
  timestamps: false
})

const Activities = db.define('activities', {
  id: { type: Sequelize.INTEGER, field: 'id', autoIncrement: true, primaryKey: true},
  owner: { type: Sequelize.INTEGER, field: '_owner' },
  type: { type: Sequelize.STRING, field: '_type' },
  date: { type: Sequelize.STRING, field: '_date' },
  relatedTo: { type: Sequelize.INTEGER, field: '_related_to'}
}, {
  freezeTableName: true,
  timestamps: false
})

const ActivitiesParticipants = db.define('activities-participants', {
  id: { type: Sequelize.INTEGER, field: 'id', autoIncrement: true, primaryKey: true},
  activity: { type: Sequelize.INTEGER, field: '_activity' },
  user: { type: Sequelize.INTEGER, field: '_user' },
}, {
  freezeTableName: true,
  timestamps: false
})

Messages.hasMany(MessageRecipient, { as: 'recipients', foreignKey: '_message'});
MessageRecipient.belongsTo(Messages, { as: 'messages', foreignKey: '_message'});

Activities.hasMany(ActivitiesParticipants, { as: 'participants', foreignKey: '_activity' });
ActivitiesParticipants.belongsTo(Activities, { as: 'Activities', foreignKey: '_activity' });

Users.sync();

export { Users, Friendship, Messages, MessageRecipient, Activities, ActivitiesParticipants };
