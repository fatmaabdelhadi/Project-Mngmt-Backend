const { type, attachment } = require('express/lib/response')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Schema.Types

const Task = new Schema({
    taskName: String,
    description: String,
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    taskCreator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    assignedUsers: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    status: String,
    priority: String,
    cost: Number,
    startDate: Date,
    endDate: Date,
    duration: {
        type: Number,
    },
    ES: Number,
    EF: Number,
    LS: Number,
    LF: Number,
    dependency: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }],
    comments: [
        {
            user: { type: ObjectId, ref: 'User' },
            text: String
        },
    ]
},
{
    timestamps: true
})

module.exports = mongoose.model('task', Task)