const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const bcrypt = require('bcryptjs');
const { Sequelize } = require('sequelize');
const fs = require('fs');

const {
  DrugRoutes,
  DrugConflictRoutes,
  DrugTakenRecordRoutes,
  PrescriptionRoutes,
  RoleRoutes,
  UserRoutes,
  UserRoleRoutes,
} = require('./Routes');

const app = express();
const {
  User,
  UserRole,
  Token,
  DrugTakenRecord,
} = require('./Models');

const port = 3000;

// Global middleware
app.use(cors());
app.use(express.json());

// prepopulation of med-db for dev purposes
// require('./db-prepopulate.js');
require('./dbInit.js');

// CRUD Routes
app.use('/drugs', DrugRoutes);
app.use('/drugConflicts', DrugConflictRoutes);
app.use('/drugTakenRecords', DrugTakenRecordRoutes);
app.use('/prescriptions', PrescriptionRoutes);
app.use('/roles', RoleRoutes);
app.use('/users', UserRoutes);
app.use('/userRoles', UserRoleRoutes);

// Signup route
app.post('/signup', async (req, res) => {
  const { username, email, password, roleId } = req.body;
  try {
    // Generate a salt to use for hashing
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user and assign user role
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const userRole = await UserRole.create({ roleId, userId: user.id });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send('An error occurred while creating the user');
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).send('User not found');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send('Incorrect password');
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '12h' });
    await Token.create({ token });
    const userRoles = await user.getRoles();
    res.json({ token, username: user.username, email: user.email, userId: user.id, roles: userRoles });
  } catch (err) {
    console.log(err);
    res.status(500).send('An error occurred while logging in');
  }
});

// Logout route
app.post('/logout', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[0];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decoded', decoded);
    const tokenInstance = await Token.findOne({ where: { token } });
    if (!tokenInstance) {
      return res.status(400).send('Invalid token');
    }
    if (tokenInstance.isRevoked) {
      return res.status(400).send('Token already revoked');
    }
    await tokenInstance.update({ isRevoked: true });
    res.status(200).send('Logged out successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


// TODO: create patient profile

// TODO: get user profile

// TODO: generate suggestion for prescription

// TODO: generate response for current patient condition

// TODO: CV for pill classification

// Protected route
// app.get('/protected', expressJwt({ secret: process.env.JWT_SECRET }), (req, res) => {
//   res.send(`Welcome to the protected route, ${req.user.username}!`);
// });


// update "taken" status upon receiving confirmation
app.post('/confirmTaken', async (req, res) => {
  const { success } = req.body;
  try {
    if (!success) {
      return res.status(400).send('Drugs not taken yet');
    }
    // get the most recent drugTakenRecord of patientId=2
    const maxIdRecord = await DrugTakenRecord.findOne({
      attributes: [[Sequelize.literal('MAX("id")'), "maxId"]],
      where: { patientId: 2 }
    });
    console.log("maxId is: " + maxIdRecord.get("maxId"));

    if (!maxIdRecord) {
      return res.status(400).send('No drug taken record exists');
    }
    await DrugTakenRecord.update({"taken": success}, { where: { id: maxIdRecord.get("maxId") } });
    res.status(200).send('confirmed taken successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error while confirming drug taken');
  }
});

app.get('/', (req, res) => {
  res.send('Hello World2!');
});

app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.listen(port, () => {
  console.log(`Novo Nordisk Medical Management listening at http://localhost:${port}`);
});


