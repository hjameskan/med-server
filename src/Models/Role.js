const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Role = sequelize.define('Role', {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  });

  module.exports = Role;