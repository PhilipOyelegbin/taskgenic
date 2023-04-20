const express = require('express');
const todoController = require('../controllers/todoControllers');

const viewer = express.Router();

viewer.get("/", todoController.get_todo)

viewer.post("/", todoController.post_todo)

viewer.patch("/:id", todoController.update_todo)

viewer.delete("/:id", todoController.delete_todo)

module.exports = viewer