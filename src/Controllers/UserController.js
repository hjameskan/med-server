const { User, Prescription, Drug, DrugConflict, DrugTakenRecord } = require('../Models');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error });
  }
};

// Get a single user by id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error });
}
};

// Create a new user
exports.createUser = async (req, res) => {
try {
  const user = await User.create(req.body);
  res.status(201).json(user);
} catch (error) {
  res.status(500).json({ message: 'Error creating user', error });
}
};

// Update a user by id
exports.updateUser = async (req, res) => {
try {
  await User.update(req.body, { where: { id: req.params.id } });
  res.status(200).json({ message: 'User updated successfully' });
} catch (error) {
  res.status(500).json({ message: 'Error updating user', error });
}
};

// Delete a user by id
exports.deleteUser = async (req, res) => {
try {
  await User.destroy({ where: { id: req.params.id } });
  res.status(200).json({ message: 'User deleted successfully' });
} catch (error) {
  res.status(500).json({ message: 'Error deleting user', error });
}
};

// Get all info on user by id
// Get all info on user by id
exports.getUserInfoById = async (req, res) => {
  try {
    const user = await User.findOne({ 
      where: { id: req.params.id },
      include: [
        {
          model: Prescription,
          as: 'prescriptions',
          include: [
            {
              model: Drug,
              as: 'drug',
            }
          ],
        }
      ],
     });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Fetching all prescriptions of the user and associated drugs with their conflicts
    const drugsTakenRecordByUserId = await DrugTakenRecord.findAll({ 
      where: { patientId: req.params.id },
      include: [
        {
          model: Drug,
          as: 'drug',
          // include: [
          //   {
          //     model: DrugConflict,
          //     as: 'conflictingDrugsOne',
          //   }, 
          //   {
          //     model: DrugConflict,
          //     as: 'conflictingDrugsTwo',
          //   }
          // ],
        },
        {
          model: Prescription,
          as: 'prescription',
        },
      ],
    });

    const drugConflictList = await DrugConflict.findAll();
   
    res.status(200).json({user: { patientId: req.params.id, ...user.get({plain: true}) }, drugConflictList });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving prescriptions and drugs', error });
  }
};
