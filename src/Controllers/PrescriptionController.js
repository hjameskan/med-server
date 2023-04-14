const { Prescription } = require('../Models');

// Get all prescriptions
exports.getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.findAll();
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving prescriptions', error });
  }
};

// Get a single prescription by id
exports.getPrescriptionById = async (req, res) => {
  try {
    const prescription = await Prescription.findByPk(req.params.id);
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    res.status(200).json(prescription);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving prescription', error });
  }
};

// Create a new prescription
exports.createPrescription = async (req, res) => {
  try {
    const prescription = await Prescription.create(req.body);
    res.status(201).json(prescription);
  } catch (error) {
    res.status(500).json({ message: 'Error creating prescription', error });
  }
};

// Update a prescription by id
exports.updatePrescription = async (req, res) => {
  try {
    await Prescription.update(req.body, { where: { id: req.params.id } });
    res.status(200).json({ message: 'Prescription updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating prescription', error });
  }
};

// Delete a prescription by id
exports.deletePrescription = async (req, res) => {
  try {
    await Prescription.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: 'Prescription deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting prescription', error });
  }
};
