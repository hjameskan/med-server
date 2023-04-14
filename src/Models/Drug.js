const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Drug = sequelize.define('Drug', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Drug;
