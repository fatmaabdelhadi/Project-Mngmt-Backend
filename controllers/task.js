const req = require('express/lib/request');
const { task } = require('../routes/task');
const { ObjectId } = require('mongoose').Types;
const Task = require("../models/task");

const createTask = async (req,res) =>{
    const {taskName, taskId, description, projectId, assignedUser, dueDate, comments} = req.body;
    const task = await new Task({taskName, taskId, description, projectId, assignedUser, dueDate, comments}).save();

    if (task) res.json(task)
}

const updateTask =  (taskId, updatedTaskInfo) =>{
    //const {taskName, description, projectId, assignedUser, dueDate, comments, status, priority } = req.body;
    let taskToUpdate = findTaskById(taskId);
    if (!taskToUpdate) {
        return "Task not found";
    }
    if (updatedTaskInfo.taskName) {
        taskToUpdate.taskName = updatedTaskInfo.taskName;
    }
    if (updatedTaskInfo.description) {
        taskToUpdate.description = updatedTaskInfo.description;
    }
    if (updatedTaskInfo.projectId) {
        taskToUpdate.projectId = updatedTaskInfo.projectId;
    }
    if (updatedTaskInfo.assignedUser) {
        taskToUpdate.assignedUser = updatedTaskInfo.assignedUser;
    }
    if (updatedTaskInfo.status) {
        taskToUpdate.status = updatedTaskInfo.status;
    }
    if (updatedTaskInfo.priority) {
        taskToUpdate.priority = updatedTaskInfo.priority;
    }
    if (updatedTaskInfo.dueDate) {
        taskToUpdate.dueDate = updatedTaskInfo.dueDate;
    }
    //updating date
    taskToUpdate.updatedAt = new Date();
    saveOrUpdateTask(taskToUpdate);
    return "Task is updated successfully";
}

function deleteTask(taskId) {

    let taskIndex = findTaskIndexById(taskId);

    // Check if the task exists
    if (taskIndex === -1) {
        return "Task not found";
    }

    // Remove the task from the list of tasks
    task.splice(taskIndex, 1);

    return "Task deleted successfully";
}

// console.log(deleteTask(taskIdToDelete));
const getTask = async (req, res) => {
    const id = req.params.id;
    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        console.error('Error fetching task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    createTask,
    updateTask,
    deleteTask,
    getTask,
    updateTask
};