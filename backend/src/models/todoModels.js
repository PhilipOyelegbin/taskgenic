const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema(
    {
        title: {type: String, require: [true, "The title is required"]},
        description: {type: String, require: [true, "The description is required"]},
        status: {type: String, require: [true, "The status is required"]},
    },
    {
        timestamps: true
    }
)

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo;