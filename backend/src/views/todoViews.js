const express = require('express');
const {get_todo, post_todo, update_todo, delete_todo} = require('../controllers/todoControllers');

const viewer = express.Router();

viewer.route("/").get(get_todo).post(post_todo)
viewer.route("/:id").patch(update_todo).delete(delete_todo)

module.exports = viewer