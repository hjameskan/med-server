const express = require('express');
const router = express.Router();
const drugConflictController = require('../Controllers/DrugConflictController');

router.get('/', drugConflictController.getAllDrugConflicts);
router.get('/:id', drugConflictController.getDrugConflictById);
router.post('/', drugConflictController.createDrugConflict);
router.put('/:id', drugConflictController.updateDrugConflict);
router.delete('/:id', drugConflictController.deleteDrugConflict);

module.exports = router;
