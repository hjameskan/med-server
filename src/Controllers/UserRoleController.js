const { UserRole } = require('../Models');

// Get all user roles
exports.getAllUserRoles = async (req, res) => {
  try {
    const userRoles = await UserRole.findAll();
    res.status(200).json(userRoles);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user roles', error });
  }
};

// Get a single user role by id
exports.getUserRoleById = async (req, res) => {
  try {
    const userRole = await UserRole.findByPk(req.params.id);
    if (!userRole) {
      return res.status(404).json({ message: 'User role not found' });
    }
    res.status(200).json(userRole);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user role', error });
  }
};

// Create a new user role
exports.createUserRole = async (req, res) => {
  try {
    const userRole = await UserRole.create(req.body);
    res.status(201).json(userRole);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user role', error });
  }
};

// Update a user role by id
exports.updateUserRole = async (req, res) => {
  try {
    await UserRole.update(req.body, { where: { id: req.params.id } });
    res.status(200).json({ message: 'User role updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user role', error });
  }
};

// Delete a user role by id
exports.deleteUserRole = async (req, res) => {
  try {
    await UserRole.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: 'User role deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user role', error });
  }
};
