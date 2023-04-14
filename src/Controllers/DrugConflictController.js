const { DrugConflict } = require('../Models');

// Get all drug conflicts
exports.getAllDrugConflicts = async (req, res) => {
  try {
    const drugConflicts = await DrugConflict.findAll();
    res.status(200).json(drugConflicts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving drug conflicts', error });
  }
};

// Get a single drug conflict by id
exports.getDrugConflictById = async (req, res) => {
  try {
    const drugConflict = await DrugConflict.findByPk(req.params.id);
    if (!drugConflict) {
      return res.status(404).json({ message: 'Drug conflict not found' });
    }
    res.status(200).json(drugConflict);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving drug conflict', error });
  }
};

// Create a new drug conflict
exports.createDrugConflict = async (req, res) => {
  try {
    const drugConflict = await DrugConflict.create(req.body);
    res.status(201).json(drugConflict);
  } catch (error) {
    res.status(500).json({ message: 'Error creating drug conflict', error });
  }
};

// Update a drug conflict by id
exports.updateDrugConflict = async (req, res) => {
  try {
    await DrugConflict.update(req.body, { where: { id: req.params.id } });
    res.status(200).json({ message: 'Drug conflict updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating drug conflict', error });
  }
};

// Delete a drug conflict by id
exports.deleteDrugConflict = async (req, res) => {
  try {
    await DrugConflict.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: 'Drug conflict deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting drug conflict', error });
  }
};
