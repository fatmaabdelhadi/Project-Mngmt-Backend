// const router = require('express').Router()
// const projectController = require ('../controllers/project.js')

// router.post('/', projectController.createProject)
// router.get('/', projectController.getProject)
// // router.get('/', userController.getAllUsers)
// // router.delete('/', userController.deleteUser)

const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project');

router.post('/', projectController.createProject);
router.get('/:id', projectController.getProject);
router.post('/:id', projectController.updateProject)
router.delete('/:id', projectController.deleteProject)

module.exports = router;
