const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Token = sequelize.define('Token', {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isRevoked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = Token;
