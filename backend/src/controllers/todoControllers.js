const Todo = require("../models/todoModels");

async function get_todo(req, res) {
    try {
        const todo = await Todo.find()
        res.status(200).json({message: "All task received", todo})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

async function post_todo(req, res) {
    try {
        const todo = await Todo.create(req.body)
        res.status(200).json({message: "Task saved successfully", todo})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

async function update_todo(req, res) {
    try {
        const id = req.params.id
        if(!id) {
            res.status(400).json({error: "ID is required"})
        }
        const todo = await Todo.findByIdAndUpdate(id, req.body)
        if(!todo) {
            res.status(404).json({error: `Todo with id ${id} not found.`})
        } else {
            const updatedTodo = await Todo.findByIdAndUpdate(id)
            res.status(200).json({message: `Todo with id ${id} updated successfully.`, updatedTodo})
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

async function delete_todo(req, res) {
    try {
        const id = req.params.id
        if(!id) {
            res.status(400).json({error: "ID is required"})
        }
        const todo = await Todo.findByIdAndDelete(id)
        if(!todo) {
            res.status(404).json({error: `Todo with id ${id} not found.`})
        } else {
            res.status(200).json({message: `Todo with id ${id} deleted successfully.`, todo})
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    get_todo,
    post_todo,
    update_todo,
    delete_todo,
}