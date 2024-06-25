const express = require('express')
const router = express.Router()
const taskController = require('../controllers/task')

router.post('/create', taskController.createTask)
router.post('/calculate/:projectId', taskController.calculateLateStartAndFinish)
router.get('/find/:id', taskController.getTask)
router.get('/all', taskController.getAllTasks)
router.put('/update/:id', taskController.updateTask)
router.delete('/delete/:id', taskController.deleteTask)
router.get('/user/:userId', taskController.getAllUserTasks) // User Tasks
router.get('/project/:projectId', taskController.getAllProjectTasks) // Project Tasks

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management
 */

/**
 * @swagger
 * /api/tasks/create:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - taskName
 *               - startDate
 *               - endDate
 *             properties:
 *               taskName:
 *                 type: string
 *               description:
 *                 type: string
 *               project:
 *                 type: string
 *                 format: ObjectId
 *               taskCreator:
 *                 type: string
 *                 format: ObjectId
 *               assignedUsers:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: ObjectId
 *               status:
 *                 type: string
 *               priority:
 *                 type: string
 *               cost:
 *                 type: number
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               dueDate:
 *                 type: string
 *                 format: date
 *               dependancy:
 *                 type: string
 *                 format: ObjectId
 *               comments:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: string
 *                       format: ObjectId
 *                     text:
 *                       type: string
 *     responses:
 *       200:
 *         description: Task created successfully
 *       400:
 *         description: Missing required fields or task already exists
 *       500:
 *         description: Error creating task
 */

/**
 * @swagger
 * /api/calculate/{projectId}:
 *   post:
 *     summary: Calculate Late Start and Late Finish (LS and LF) by Project ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The project ID
 *     responses:
 *       200:
 *         description: The task description by ID
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/tasks/find/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task ID
 *     responses:
 *       200:
 *         description: The task description by ID
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/tasks/all:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: A list of tasks
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/tasks/update/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskName:
 *                 type: string
 *               description:
 *                 type: string
 *               project:
 *                 type: string
 *                 format: ObjectId
 *               taskCreator:
 *                 type: string
 *                 format: ObjectId
 *               assignedUsers:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: ObjectId
 *               status:
 *                 type: string
 *               priority:
 *                 type: string
 *               cost:
 *                 type: number
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               dueDate:
 *                 type: string
 *                 format: date
 *               dependancy:
 *                 type: string
 *                 format: ObjectId
 *               comments:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: string
 *                       format: ObjectId
 *                     text:
 *                       type: string
 *     responses:
 *       200:
 *         description: The updated task description by ID
 *       404:
 *         description: Task not found
 *       500:
 *         description: Error updating task
 */

/**
 * @swagger
 * /api/tasks/delete/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task ID
 *     responses:
 *       200:
 *         description: The deleted task description by ID
 *       404:
 *         description: Task not found
 *       500:
 *         description: Error deleting task
 */

/**
 * @swagger
 * /api/tasks/user/{userId}:
 *   get:
 *     summary: Get all tasks assigned to a user
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A list of tasks assigned to the user
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/tasks/project/{projectId}:
 *   get:
 *     summary: Get all tasks associated with a project
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: string
 *         required: true
 *         description: The project ID
 *     responses:
 *       200:
 *         description: A list of tasks associated with the project
 *       500:
 *         description: Internal server error
 */

module.exports = router