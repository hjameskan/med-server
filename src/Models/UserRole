const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');
const User = require('./User.js');

const UserRole = sequelize.define('UserRole', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = UserRole;