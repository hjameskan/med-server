const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const DrugConflict = sequelize.define('DrugConflict', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  drugIdOne: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Drugs',
      key: 'id',
    },
  },
  drugIdTwo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Drugs',
      key: 'id',
    },
  },
});

module.exports = DrugConflict;
