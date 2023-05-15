module.exports = ({ User, UserRole, Role }) => {
  User.belongsToMany(Role, {
    through: UserRole,
    foreignKey: 'userId',
    otherKey: 'roleId'
  });
};

  
  