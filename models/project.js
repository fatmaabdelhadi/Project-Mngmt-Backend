const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const Project = new Schema({
    projectName: String,
    description: String,
    projectManager: {
        type: ObjectId,
        ref: 'User'
    },
    teamMembers: [{ // Task contributors
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    startDate: Date,
    endDate: Date,
    status: String,
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }],
    progress: {
        completedTasks: Number,
        totalTasks: Number,
        completionPercentage: Number
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('project', Project)