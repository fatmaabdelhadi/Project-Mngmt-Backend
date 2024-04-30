// const router = require('express').Router()
// const userController = require ('../controllers/user')

// router.get('/', userController.getAllUserProjects)
// router.get('/', userController.getAllProjects)

// router.get("/usertest", (req, res) =>{
//     res.send("User test")
// })

// router.post("/userpost", (req, res) =>{
//     const username = req.body.username
//     console.log(username)
// })

// module.exports = router

const express = require('express');
const router = express.Router();

// Import user controller
const userController = require('../controllers/user');

// User routes
router.post('/register', userController.registerUser);


router.get('/find/:id', userController.getUser);
router.get('/email', userController.getUser);
router.get('/all', userController.getAllUsers);

router.delete('/delete/:id', userController.deleteUser);
router.put('/update/:id', userController.updateUser);

// Projects
router.get('/', userController.getAllUserProjects)
router.get('/', userController.getAllProjects)


// router.get("/MAF/test",(req,res)=>{
//     res.send("GET A FUCK OUT OF HERE!");
// });


module.exports = router
