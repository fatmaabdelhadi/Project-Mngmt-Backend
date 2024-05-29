const { uniqueId } = require('lodash')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Schema.Types
// const bcrypt = require('bcryptjs')

const User = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: String,
        password: {
            type: String,
            required: true
        },
        role: {
            managedProjects: [{ type: ObjectId, ref: 'Project' }],
            contributedTasks: [{ type: ObjectId, ref: 'Task' }]
        },
        profile: {
            fullName: String,
            jobTitle: String,
            contactInfo: {
                email: String,
                phone: String,
                address: String
            }
        },
        preferences: {
            theme: String,
            notifications: {
                email: Boolean,
                sms: Boolean
            }
        }
        // image: {
        //     type: String
        // }
    },
    {
        timestamps: true
    }
)

// User.pre('save', async function (next) {
//     const user = this;
//     if (!user.isModified('password')) return next();
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(user.password, salt);
//     next();
// })

module.exports = mongoose.model('user', User)