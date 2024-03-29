const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.get('/info/:id', userController.getUserInfoById);

module.exports = router;
