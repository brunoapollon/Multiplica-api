const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const User = require('../models/User');
const Subject = require('../models/Subject');
const File = require('../models/File');
const UserType = require('../models/UserType');
const Score = require('../models/Score');

const models = [User, File, UserType];

const connection = new Sequelize(dbConfig);
User.init(connection);
Subject.init(connection);
File.init(connection);
UserType.init(connection);
Score.init(connection);

User.associate(connection.models);
Score.associate(connection.models);

module.exports = connection;
