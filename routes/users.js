const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users');

router.get('/:id', usersController.getOneUser);
router.get('/', usersController.getAllUsers);
router.post('/', usersController.addNewUser);



module.exports = router;