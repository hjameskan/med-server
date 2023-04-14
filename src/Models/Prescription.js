const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Prescription = sequelize.define('Prescription', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  drugId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Drugs',
      key: 'id',
    },
  },
  dosage: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  frequency: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Prescription;
