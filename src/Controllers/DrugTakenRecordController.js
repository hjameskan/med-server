const { DrugTakenRecord } = require('../Models');

// Get all drug taken records
exports.getAllDrugTakenRecords = async (req, res) => {
  try {
    const drugTakenRecords = await DrugTakenRecord.findAll();
    res.status(200).json(drugTakenRecords);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving drug taken records', error });
  }
};

// Get a single drug taken record by id
exports.getDrugTakenRecordById = async (req, res) => {
  try {
    const drugTakenRecord = await DrugTakenRecord.findByPk(req.params.id);
    if (!drugTakenRecord) {
      return res.status(404).json({ message: 'Drug taken record not found' });
    }
    res.status(200).json(drugTakenRecord);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving drug taken record', error });
  }
};

// Create a new drug taken record
exports.createDrugTakenRecord = async (req, res) => {
  try {
    const drugTakenRecord = await DrugTakenRecord.create(req.body);
    res.status(201).json(drugTakenRecord);
  } catch (error) {
    res.status(500).json({ message: 'Error creating drug taken record', error });
  }
};

// Update a drug taken record by id
exports.updateDrugTakenRecord = async (req, res) => {
  try {
    await DrugTakenRecord.update(req.body, { where: { id: req.params.id } });
    res.status(200).json({ message: 'Drug taken record updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating drug taken record', error });
  }
};

// Delete a drug taken record by id
exports.deleteDrugTakenRecord = async (req, res) => {
  try {
    await DrugTakenRecord.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: 'Drug taken record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting drug taken record', error });
  }
};
