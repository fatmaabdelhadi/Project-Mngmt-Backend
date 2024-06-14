
const userRoute = require('./routes/user.js')
const projectRoute = require('./routes/project.js')
const taskRoute = require('./routes/task.js')
let lodash = require('lodash');
const express = require('express');
const app = express();
app.use(express.json()); // middleware
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
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

app.get("/api/test", ()=>{
    console.log("test")
})

app.listen(process.env.PORT || 5000, ()=> {
    console.log("Backend server is running")
})

const options = {
    definition: {
        openai: "3.0.0",
        info: {
            title: "API Library",
            version: "1.0.0",
            description: "Project Management API Library"
        },
        servers: [
            {
                // url: "http://pm-platform-backend.onrender.com"
                url: "http://localhost:5000" // local testing
            }
        ]
    },
    apis: ["./routes/*.js"]
}

const specs = swaggerJsDoc(options)
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))