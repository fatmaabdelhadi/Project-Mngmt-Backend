const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Schema.Types

const User = new Schema({
    username: {
        type: String,
        required: true
    },
    email: String,
    password: String,
    projectRole: [{
        type: ObjectId,
        role: String,
        ref: 'Project'
    }],
    // image: {
    //     type: String
    // }
})