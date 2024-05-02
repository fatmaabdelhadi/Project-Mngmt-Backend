// const router = require('express').Router()
// const projectController = require ('../controllers/project.js')

// router.post('/', projectController.createProject)
// router.get('/', projectController.getProject)
// // router.get('/', userController.getAllUsers)
// // router.delete('/', userController.deleteUser)

const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project');

router.post('/create', projectController.createProject);
router.get('/find/:id', projectController.getProject);
router.post('/update/:id', projectController.updateProject)
router.delete('/delete/:id', projectController.deleteProject)

module.exports = router;
