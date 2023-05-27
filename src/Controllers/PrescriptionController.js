const { Prescription, Drug, User, DrugConflict } = require('../Models');

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

// Get all prescriptions by user id
exports.getPrescriptionsByUserId = async (req, res) => {
  try {
      const prescriptions = (await Prescription.findAll({
        where: {
          patientId: req.params.userId
        },
        include: [
          {
            model: User,
            as: 'doctor'
          },
          {
            model: Drug,
            as: 'drug'
          }
        ]
      })).map(instance => instance.get({ plain: true })); // Converting instances to plain objects.

      
      const drugConflictList = (await DrugConflict.findAll()).map(instance => instance.get({ plain: true })); // Converting instances to plain objects.
      
      // initialize drugConflictList.length * drugConflictList.length 2d array for contraindication check
      const drugCount = await Drug.count();

      const conflictList2dArray = [];
      for (let i = 0; i < drugCount + 1; i++) {
        const row = [];
        for (let j = 0; j < drugCount + 1; j++) {
          row.push(0);
        }
        conflictList2dArray.push(row);
      }
      
      drugConflictList.forEach((conflict) => {
        const { drugIdOne, drugIdTwo } = conflict;
        conflictList2dArray[drugIdOne][drugIdTwo] = 1;
        conflictList2dArray[drugIdTwo][drugIdOne] = 1;
      });
  
      // contraindication check
      for( let i = 0; i < prescriptions.length; i++) {
        for (let j = i + 1; j < prescriptions.length; j++) {
          const { drugId: drugIdOne } = prescriptions[i];
          const { drugId: drugIdTwo } = prescriptions[j];
          if (conflictList2dArray[drugIdOne][drugIdTwo] === 1) {
            prescriptions[i].hasConflict = true;
            (prescriptions[i].conflictDrugs = prescriptions[i].conflictDrugs || []).push(prescriptions[j].drug);
            prescriptions[j].hasConflict = true;
            (prescriptions[j].conflictDrugs = prescriptions[j].conflictDrugs || []).push(prescriptions[i].drug);
          }
        }
      }


    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: `Error retrieving prescriptions: ${error}`, error });
  }
};
