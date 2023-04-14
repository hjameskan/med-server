const { Role } = require('../Models');

// Get all roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving roles', error });
  }
};

// Get a single role by id
exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving role', error });
  }
};

// Create a new role
exports.createRole = async (req, res) => {
  try {
    const role = await Role.create(req.body);
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ message: 'Error creating role', error });
  }
};

// Update a role by id
exports.updateRole = async (req, res) => {
  try {
    await Role.update(req.body, { where: { id: req.params.id } });
    res.status(200).json({ message: 'Role updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating role', error });
  }
};

// Delete a role by id
exports.deleteRole = async (req, res) => {
  try {
    await Role.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting role', error });
  }
};
