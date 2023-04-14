const express = require('express');
const router = express.Router();
const prescriptionController = require('../Controllers/PrescriptionController');

router.get('/', prescriptionController.getAllPrescriptions);
router.get('/:id', prescriptionController.getPrescriptionById);
router.post('/', prescriptionController.createPrescription);
router.put('/:id', prescriptionController.updatePrescription);
router.delete('/:id', prescriptionController.deletePrescription);

module.exports = router;
