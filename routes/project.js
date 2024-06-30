const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project');

router.post('/create', projectController.createProject);
router.get('/find/:id', projectController.getProject);
router.get('/all', projectController.getAllProjects)
router.put('/update/:id', projectController.updateProject)
router.put('/percentage/:id', projectController.updateCompletionPercentage)
router.delete('/delete/:id', projectController.deleteProject)
router.get('/user/:userId', projectController.getAllUserProjects) // User Projects

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management
 */

/**
 * @swagger
 * /api/projects/create:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - projectName
 *               - projectManager
 *             properties:
 *               projectName:
 *                 type: string
 *               description:
 *                 type: string
 *               projectManager:
 *                 type: string
 *               teamMembers:
 *                 type: array
 *                 items:
 *                   type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Project created successfully
 *       400:
 *         description: Missing required fields or project already exists
 *       500:
 *         description: Error registering project
 */

/**
 * @swagger
 * /api/projects/find/{id}:
 *   get:
 *     summary: Get a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The project ID
 *     responses:
 *       200:
 *         description: The project description by ID
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/projects/all:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: A list of projects
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The project ID
 *     responses:
 *       200:
 *         description: The deleted project description by ID
 *       404:
 *         description: Project not found
 *       500:
 *         description: Error deleting project
 */

/**
 * @swagger
 * /api/projects/update/{id}:
 *   put:
 *     summary: Update a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectName:
 *                 type: string
 *               description:
 *                 type: string
 *               projectManager:
 *                 type: string
 *               teamMembers:
 *                 type: array
 *                 items:
 *                   type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *               tasks:
 *                 type: array
 *                 items:
 *                   type: string
 *               progress:
 *                 type: object
 *                 properties:
 *                   lateTasks:
 *                     type: number
 *                   notStartedTasks:
 *                     type: number
 *                   inProgress:
 *                     type: number
 *                   completedTasks:
 *                     type: number
 *                   totalTasks:
 *                     type: number
 *                   completetionPercentage:
 *                     type: number
 *     responses:
 *       200:
 *         description: The updated project description by ID
 *       404:
 *         description: Project not found
 *       500:
 *         description: Error updating project
 */

/**
 * @swagger
 * /api/projects/percentage/{id}:
 *   put:
 *     summary: Update a project completion percentage by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               progress:
 *                 type: object
 *                 properties:
 *                   completedTasks:
 *                     type: number
 *                   completetionPercentage:
 *                     type: number
 *     responses:
 *       200:
 *         description: Project percentage has been calculated successfully
 *       404:
 *         description: Project not found
 *       500:
 *         description: Error updating project
 */

/**
 * @swagger
 * /api/projects/delete/{id}:
 *   delete:
 *     summary: Delete a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The project ID
 *     responses:
 *       200:
 *         description: The deleted project description by ID
 *       404:
 *         description: Project not found
 *       500:
 *         description: Error deleting project
 */

/**
 * @swagger
 * /api/projects/user/{userId}:
 *   get:
 *     summary: Get all projects managed by a specific user
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A list of projects managed by the user
 *       500:
 *         description: Internal server error
 */

module.exports = router;