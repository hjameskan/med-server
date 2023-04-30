const express = require('express');
const DrugController = require('../Controllers/DrugController');
const router = express.Router();


// Drug routes
router.get('/', DrugController.getAllDrugs);
router.get('/:id', DrugController.getDrugById);
router.post('/', DrugController.createDrug);
router.put('/:id', DrugController.updateDrug);
router.delete('/:id', DrugController.deleteDrug);

module.exports = router;
