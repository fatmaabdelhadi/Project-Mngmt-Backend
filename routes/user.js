const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.post('/signup', userController.registerUser)
router.post("/login", userController.loginUser)
router.get('/find/:id', userController.getUser)
router.get('/all', userController.getAllUsers)
router.put('/update/:id', userController.updateUser)
router.delete('/delete/:id', userController.deleteUser)

module.exports = router