const req = require("express/lib/request")
const { ObjectId } = require("mongoose").Types
const Task = require("../models/task")
const Project = require("../models/project")

const createTask = async (req, res) => {
    const {
        taskName,
        description,
        project,
        taskCreator,
        assignedUsers,
        status,
        priority,
        cost,
        startDate,
        endDate,
        dependency,
        comments,
    } = req.body

    if (!taskName || !startDate || !endDate) {
        return res.status(400).send("Missing required fields")
    }

    const existingTask = await Task.findOne({ taskName, taskCreator })
    if (existingTask) {
        return res.status(400).send("Task already exists")
    }

    const start = new Date(startDate).getTime()
    const end = new Date(endDate).getTime()
    const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) // Calculate duration in days

    let ES = 0
    let EF = ES + duration

    if (dependency && dependency.length > 0) {
        try {
            const dependencyTasks = await Task.find({ _id: { $in: dependency } })

            if (dependencyTasks.length > 0) {
                const maxEF = Math.max(...dependencyTasks.map(task => task.EF))
                ES = maxEF
                EF = ES + duration
            }
        } catch (error) {
            console.error('Error fetching dependency tasks:', error)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }

    const task = new Task({
        taskName,
        description,
        project,
        taskCreator,
        assignedUsers,
        status,
        priority,
        cost,
        startDate,
        endDate,
        ES,
        EF,
        LS: null, // Late Start (to be calculated later)
        LF: null, // Late Finish (to be calculated later)
        duration,
        dependency,
        comments,
    })

    try {
        await task.save()
        res.send(`Task with ID ${task._id} created successfully`)
    } catch (error) {
        res.status(500).send("Error creating task")
    }
}

const calculateLateStartAndFinish = async (req, res) => {

    const projectId = req.params.projectId
    
    try {
        const tasks = await Task.find({ project: projectId })

        if (tasks.length === 0) {
            return res.status(404).json({ error: "No tasks found for the project" })
        }

        const projectEndDate = Math.max(...tasks.map(task => task.EF))
        const sortedTasks = tasks.sort((a, b) => b.EF - a.EF) // Sort tasks by EF in descending order

        for (let i = 0; i < sortedTasks.length; i++){

            const task = sortedTasks[i]
            const dependentTasks = await Task.find({ _id: { $in: task.dependency } })

            if (sortedTasks[0]){ // First in desc sorted array (last task)
                task.LF = task.EF
            } else {

                task.LF = sortedTasks[i-1].LS

                if (task.ES === sortedTasks[i-1].ES) {
                    task.LF = sortedTasks[i-1].LF
                }
                if (dependentTasks > 1) {
                    task.LF = Math.min(...dependentTasks.map(dependentTask => dependentTask.LS))
                }
            }
            
            task.LS = task.LF - task.duration
        }

        await Project.findByIdAndUpdate(projectId, { endDate: new Date(projectEndDate) })

        res.send(`LS and LF for project with ID ${projectId} calculated successfully`)
    } catch (error) {
        console.error("Error calculating late start and finish:", error)
        res.status(500).json({ error: "Internal server error" })
    }
}

const getTask = async (req, res) => {
    const id = req.params.id
    const task = await Task.findById(id)
    if (task) res.json(task)
}

const getAllProjectTasks = async (req, res) => {
    try {
        const projectId = req.params.projectId
        const tasks = await Task.find({ project: projectId })
        res.status(200).json(tasks)
    } catch (error) {
        console.error('Error fetching project tasks:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
        res.json(tasks)
    } catch (error) {
        console.error('Error fetching tasks:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

const getAllUserTasks = async (req, res) => {
    try {
        const userId = req.params.userId
        const tasks = await Task.find({ assignedUsers: userId })
        res.status(200).json(tasks)
    } catch (error) {
        console.error('Error fetching user tasks:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!task) return res.status(404).send("Task not found")
        res.send(task)
    } catch (error) {
        res.status(500).send("Error updating task")
    }
}

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id
        const task = await Task.findByIdAndDelete(taskId)
        if (!task) {
            return res.status(404).send("Task not found")
        }
        res.send(task)
    } catch (error) {
        res.status(500).send("Error deleting task")
    }
}

module.exports = {
    getTask,
    getAllTasks,
    getAllUserTasks,
    getAllProjectTasks,
    createTask,
    calculateLateStartAndFinish,
    updateTask,
    deleteTask
}