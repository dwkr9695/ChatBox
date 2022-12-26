'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
let fixture = path.join(__dirname, "../.env");
let dotenv = require('dotenv').config({ path: fixture })
let envFile = dotenv.parsed
const env = envFile.NODE_ENV || 'development';
const config = require(path.join(__dirname, '../config/config.js'))[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


sequelize.authenticate().then(() => {
    console.log("Connected to Database..");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

db.message = require("./message")(sequelize,  Sequelize.DataTypes);
db.groupMembers = require("./groupMembers")(sequelize,  Sequelize.DataTypes);
db.users = require("./users")(sequelize,  Sequelize.DataTypes);
db.groups = require("./groups")(sequelize,  Sequelize.DataTypes);

db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.users.hasMany(db.message, {
  foreignKey : 'receiverUserId',
  as : 'messageReceive'
});
db.message.belongsTo(db.users, {
  foreignKey : 'receiverUserId',
  as : 'userReceive'
})


db.users.hasMany(db.message, {
  foreignKey : 'senderUserId',
  as : 'messageSend'
});
db.message.belongsTo(db.users, {
  foreignKey : 'senderUserId',
  as : 'userSend'
})

db.groups.hasMany(db.groupMembers, {
  foreignKey : 'groupId',
  as : 'groupMembers'
});
db.groupMembers.belongsTo(db.groups, {
  foreignKey : 'groupId',
  as : 'groups'
})

db.groups.hasMany(db.message, {
  foreignKey : 'groupId',
  as : 'message'
});

db.message.belongsTo(db.groups, {
  foreignKey : 'groupId',
  as : 'groups'
})




module.exports = db;
