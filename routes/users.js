const express = require('express')

const router = express.Router()

const usersController = require('../controllers/users')

router.get('/:id', usersController.getOneUser)
router.delete('/:id', usersController.deleteUser)
router.get('/', usersController.getAllUsers)
router.post('/signup', usersController.signup)
router.post('/login', usersController.login)



module.exports = router