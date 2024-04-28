let lodash = require('lodash');
const express = require('express');
const mongoose = require('mongoose')
const dotenv = require("dotenv")
const app = express();
app.use(express.json()); // middleware

dotenv.config()

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("db connection successfull"))
    .catch((err) => {
        console.log(err)
    })

app.listen(process.env.PORT || 5000, () => {
        console.log("backend server running")

})

