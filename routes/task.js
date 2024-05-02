const express = require('express')
const router = express.Router()
const taskController = require('../controllers/task')

router.post('/create', taskController.createTask)
router.get('/find/:id', taskController.getTask)
router.put('/update/:id', taskController.editTask)
router.delete('/delete/:id', taskController.deleteTask)

module.exports = router