const express = require('express');
const router = express.Router();
const userRoleController = require('../Controllers/UserRoleController');

router.get('/', userRoleController.getAllUserRoles);
router.get('/:id', userRoleController.getUserRoleById);
router.post('/', userRoleController.createUserRole);
router.put('/:id', userRoleController.updateUserRole);
router.delete('/:id', userRoleController.deleteUserRole);

module.exports = router;
