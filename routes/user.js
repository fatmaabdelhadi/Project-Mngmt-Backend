const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.post('/register', userController.registerUser)
router.get('/find/:id', userController.getUser)
router.get('/email', userController.getUser)
router.get('/all', userController.getAllUsers)
router.put('/update/:id', userController.updateUser)
router.delete('/delete/:id', userController.deleteUser)

module.exports = router