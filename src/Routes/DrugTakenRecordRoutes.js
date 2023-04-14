const express = require('express');
const router = express.Router();
const drugTakenRecordController = require('../Controllers/DrugTakenRecordController');

router.get('/', drugTakenRecordController.getAllDrugTakenRecords);
router.get('/:id', drugTakenRecordController.getDrugTakenRecordById);
router.post('/', drugTakenRecordController.createDrugTakenRecord);
router.put('/:id', drugTakenRecordController.updateDrugTakenRecord);
router.delete('/:id', drugTakenRecordController.deleteDrugTakenRecord);

module.exports = router;
