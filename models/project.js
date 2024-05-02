const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const projectSchema = new Schema({
    projectName: String,
    description: String,
    projectManager: {
        type: ObjectId,
        ref: 'User'
    },
    teamMembers: [{ // contributers
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    startDate: Date,
    endDate: Date,
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }],
    progress: {
        lateTasks: Number,
        notStartedTasks: Number,
        inProgress: Number,
        completedTasks: Number,
        totalTasks: Number,
        completetionPercentage: Number
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Project', projectSchema)