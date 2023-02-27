module.exports = ({ User, UserRole }) => {
    User.hasMany(UserRole, {as: 'UserRoles', foreignKey: 'userId'});
  };