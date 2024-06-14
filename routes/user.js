const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.post('/signup', userController.registerUser)
router.post("/login", userController.loginUser)
router.get('/find/:id', userController.getUser)
router.get('/all', userController.getAllUsers)
router.put('/update/:id', userController.updateUser)
router.delete('/delete/:id', userController.deleteUser)

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               profile:
 *                 type: object
 *                 properties:
 *                   fullName:
 *                     type: string
 *                   jobTitle:
 *                     type: string
 *                   contactInfo:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       address:
 *                         type: string
 *               preferences:
 *                 type: object
 *                 properties:
 *                   theme:
 *                     type: string
 *                   notifications:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: boolean
 *                       sms:
 *                         type: boolean
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Missing required fields or user already exists
 *       500:
 *         description: Error registering user
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Missing required fields or invalid credentials
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/find/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The user description by ID
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/all:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/update/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               profile:
 *                 type: object
 *                 properties:
 *                   fullName:
 *                     type: string
 *                   jobTitle:
 *                     type: string
 *                   contactInfo:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       address:
 *                         type: string
 *               preferences:
 *                 type: object
 *                 properties:
 *                   theme:
 *                     type: string
 *                   notifications:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: boolean
 *                       sms:
 *                         type: boolean
 *     responses:
 *       200:
 *         description: The updated user description by ID
 *       404:
 *         description: User not found
 *       500:
 *         description: Error updating user
 */

/**
 * @swagger
 * /api/users/delete/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The deleted user description by ID
 *       404:
 *         description: User not found
 *       500:
 *         description: Error deleting user
 */

module.exports = router