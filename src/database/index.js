const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const User = require('../models/User');
const Subject = require('../models/Subject');
const File = require('../models/File');
const UserType = require('../models/UserType');
const Score = require('../models/Score');
const Question = require('../models/Question');

const models = [User, File, UserType, Subject, Score, Question];

const connection = new Sequelize(dbConfig);

models.map(model => model.init(connection));
models.map(model => model.associate && model.associate(connection.models));

module.exports = connection;
