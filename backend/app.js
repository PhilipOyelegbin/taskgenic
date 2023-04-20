const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const viewer = require('./src/views/todoViews')
require('dotenv').config();

const app = express();

// connect to mongodb
mongoose.connect(process.env.DATABASE_URI)
    .then(resp => {
        console.log("Database connected")
        app.listen(process.env.PORT, () => console.log("Server has started on port", process.env.PORT));
    })
    .catch(err => console.log(err))

// middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

// page route
app.get("/", (req, res) => {
    res.send("Todo API built using express, to view all data go to /todos")
})

// blogs
app.use('/todos', viewer)

// error route
app.use((req, res) => {
    res.status(404).send("Route not found")
})