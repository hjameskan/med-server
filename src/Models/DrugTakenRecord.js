const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const DrugTakenRecord = sequelize.define('DrugTakenRecord', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  prescriptionId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  drugId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dateTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  taken: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = DrugTakenRecord;
