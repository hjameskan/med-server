module.exports = ({ User, UserRole, Role }) => {
  Role.belongsToMany(User, {
    through: UserRole,
    foreignKey: 'roleId',
    otherKey: 'userId'
  });
};