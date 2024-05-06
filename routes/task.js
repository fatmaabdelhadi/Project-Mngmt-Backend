const express = require('express')
const router = express.Router()
const taskController = require('../controllers/task')

router.post('/create', taskController.createTask)
router.get('/find/:id', taskController.getTask)
router.put('/update/:id', taskController.updateTask)
router.delete('/delete/:id', taskController.deleteTask)
router.get('/user/:taskId', taskController.getAllUserTasks) // User Tasks

module.exports = router