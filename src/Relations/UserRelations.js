const { Prescription } = require("../Models");

module.exports = ({ User, UserRole, Role }) => {
  User.belongsToMany(Role, {
    through: UserRole,
    foreignKey: 'userId',
    otherKey: 'roleId'
  });

  User.hasMany(Prescription, {
    as: 'prescriptions',
    foreignKey: 'patientId',
  });
};

  
  