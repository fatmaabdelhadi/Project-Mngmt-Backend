
const userRoute = require('./routes/user.js')
const projectRoute = require('./routes/project.js')
const taskRoute = require('./routes/task.js')
let lodash = require('lodash');
const express = require('express');
const app = express()
app.use(express.json()) // middleware
const mongoose = require("mongoose")
const cors = require('cors')
const dotenv = require("dotenv")
app.use(cors())
dotenv.config()

app.use("/api/users", userRoute)
app.use("/api/projects", projectRoute)
app.use("/api/tasks", taskRoute)

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successful"))
    .catch((err) => {
        console.log(err)
    })

app.listen(process.env.PORT || 5000, ()=> {
    console.log("Backend server is running")
})