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
    assignedUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: String,
    priority: String,
    dueDate: Date,
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

module.exports = mongoose.model('TaskSchema', Task)