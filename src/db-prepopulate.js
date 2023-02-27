const { Sequelize } = require('sequelize');
const fs = require('fs');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
});

const User = sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

sequelize.sync().then(() => {
  console.log('Database synchronized');
  
  console.log('Prepopulating database...');
  
  fs.readFile('src/db-dev-data/users.json', 'utf8', (err, data) => {
    if (err) throw err;
    const users = JSON.parse(data);

    users.forEach((user) => {
      User.findOne({ where: { username: user.username, email: user.email } })
      .then((existingUser) => {
        if (!existingUser) {
          User.create({ username: user.username, email: user.email, password: user.password })
          .then(() => {
            console.log(`Data inserted into users table: ${user.username}, ${user.email}`);
          });
        } else {
          console.log(`Data already exists in users table: ${user.username}, ${user.email}, no need to pre-populate`);
        }
      });
    });

  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});

module.exports = {
  User,
};