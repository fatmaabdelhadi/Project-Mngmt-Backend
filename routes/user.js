const router = require('express').Router()

const userController = require ('../controllers/user')

router.post('/', userController.createUser)
router.get('/', userController.getUser)
router.get('/', userController.getAllUsers)
router.delete('/', userController.deleteUser)

module.exports = router