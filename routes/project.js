const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project');

router.post('/create', projectController.createProject);
router.get('/find/:id', projectController.getProject);
router.put('/update/:id', projectController.updateProject)
router.delete('/delete/:id', projectController.deleteProject)

module.exports = router;
