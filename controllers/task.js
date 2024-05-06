const req = require("express/lib/request");
const { ObjectId } = require("mongoose").Types;
const Task = require("../models/task");

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
        dueDate,
        dependancy,
        comments,
    } = req.body;
    if (!taskName || !startDate || !endDate || !dependancy) {
        return res.status(400).send("Missing required fields");
    }
    const existingTask = await Task.findOne({
        $and: [{ taskName }, { taskCreator }],
    });
    if (existingTask) {
        return res.status(400).send("Task already exists");
    }
    const task = new Task(req.body);
    try {
        await task.save();
        res.send(`Task with ID ${task._id} created successfully`);
    } catch (error) {
        res.status(500).send("Error creating task");
    }
}

const getTask = async (req, res) => {
    const id = req.params.id;
    const task = await Task.findById(id)
    if (task) res.json(task);
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
        const taskId = req.params.id;
        const task = await Task.findByIdAndDelete(taskId);
        if (!task) {
            return res.status(404).send("Task not found");
        }
        res.send(task);
    } catch (error) {
        res.status(500).send("Error deleting task");
    }
}

module.exports = {
    getTask,
    createTask,
    updateTask,
    deleteTask
}
