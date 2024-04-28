const router = require('express').Router()

const userController = require ('../controllers/user')
// const projectController = require ('../controllers/project')

// router.post('/', userController.createUser)
// router.get('/', userController.getUser)
// router.get('/', userController.getAllUsers)
// router.delete('/', userController.deleteUser)

router.get('/', userController.getAllUserProjects)

router.get("/usertest", (req, res) =>{
    res.send("User test")
})

router.post("/userpost", (req, res) =>{
    const username = req.body.username
    console.log(username)
})

// router.get('/:id', projectController.getAllProjects);

module.exports = router