const express = require('express')
const router = express.Router()
const taskController = require('../controllers/task')

router.post('/', taskController.createTask)
router.get('/:id', taskController.getTask)
router.get('/:id', taskController.editTask)
router.delete('/:id', taskController.deleteTask)

module.exports = router