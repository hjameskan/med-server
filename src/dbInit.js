const fs = require('fs');
const bcrypt = require('bcryptjs');

const sequelize = require('./config/database');
const Models = require('./Models');
const Relations = require('./Relations');

const {
    User,
    Role,
    UserRole,
    Token,
} = Models;

Object.values(Relations).forEach((relation) => relation(Models));

async function prepopulateDatabase() {
  try {
    await sequelize.sync();
    console.log('Database synchronized');
  
    console.log('Prepopulating database...');
  
    const usersData = await fs.promises.readFile('src/db-dev-data/users.json', 'utf8');
    const users = JSON.parse(usersData);
  
    for (const user of users) {
      const existingUser = await User.findOne({ where: { username: user.username, email: user.email } });
      if (!existingUser) {
         // Generate a salt to use for hashing
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        // Hash the password with the salt
        const hashedPassword = await bcrypt.hash(user.password, salt);
        await User.create({ username: user.username, email: user.email, password: hashedPassword });
        console.log(`Data inserted into User table: ${user.username}, ${user.email}`);
      } else {
        console.log(`Data already exists in User table: ${user.username}, ${user.email}, no need to pre-populate`);
      }
    }
  
    const rolesData = await fs.promises.readFile('src/db-dev-data/roles.json', 'utf8');
    const roles = JSON.parse(rolesData);
  
    for (const role of roles) {
      const existingRole = await Role.findOne({ where: { id: role.id, name: role.name } });
      if (!existingRole) {
        await Role.create({ id: role.id, name: role.name });
        console.log(`Data inserted into Role table: ${role.id}, ${role.name}`);
      } else {
        console.log(`Data already exists in Role table: ${role.name}, ${role.name}, no need to pre-populate`);
      }
    }
  
    const userRolesData = await fs.promises.readFile('src/db-dev-data/userRoles.json', 'utf8');
    const userRoles = JSON.parse(userRolesData);
  
    for (const userRole of userRoles) {
      const existingUserRole = await UserRole.findOne({ where: { userId: userRole.userId, roleId: userRole.roleId } });
      if (!existingUserRole) {
        await UserRole.create({ userId: userRole.userId, roleId: userRole.roleId }, { force: true });
        console.log(`Data inserted into UserRole table: ${userRole.userId}, ${userRole.roleId}`);
      } else {
        console.log(`Data already exists in UserRole table: ${userRole.userId}, ${userRole.roleId}, no need to pre-populate`);
      }
    }
  
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
}

prepopulateDatabase();

module.exports = {
    sequelize,
}
