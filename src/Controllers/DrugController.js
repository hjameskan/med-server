const { Drug } = require('../Models');

// Get all drugs
exports.getAllDrugs = async (req, res) => {
  try {
    const drugs = await Drug.findAll();
    res.status(200).json(drugs);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving drugs', error });
  }
};

// Get a single drug by id
exports.getDrugById = async (req, res) => {
  try {
    const drug = await Drug.findByPk(req.params.id);
    if (!drug) {
      return res.status(404).json({ message: 'Drug not found' });
    }
    res.status(200).json(drug);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving drug', error });
  }
};

// Create a new drug
exports.createDrug = async (req, res) => {
  try {
    const drug = await Drug.create(req.body);
    res.status(201).json(drug);
  } catch (error) {
    res.status(500).json({ message: 'Error creating drug', error });
  }
};

// Update a drug by id
exports.updateDrug = async (req, res) => {
  try {
    await Drug.update(req.body, { where: { id: req.params.id } });
    res.status(200).json({ message: 'Drug updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating drug', error });
  }
};

// Delete a drug by id
exports.deleteDrug = async (req, res) => {
  try {
    await Drug.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: 'Drug deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting drug', error });
  }
};
