const Todo = require("../models/todoModels");

async function get_todo(req, res) {
    try {
        const todo = await Todo.find()
        res.status(200).json(todo)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}

async function post_todo(req, res) {
    try {
        const todo = await Todo.create(req.body)
        res.status(200).json(todo)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }

}

async function update_todo(req, res) {
    try {
        const id = req.params.id
        const todo = await Todo.findByIdAndUpdate(id, req.body)
        if(!todo) {
            res.status(400).json({message: `Todo with id ${id} not found.`})
        } else {
            const updatedTodo = await Todo.findByIdAndUpdate(id)
            res.status(200).json(updatedTodo)
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}

async function delete_todo(req, res) {
    try {
        const id = req.params.id
        const todo = await Todo.findByIdAndDelete(id)
        if(!todo) {
            res.status(400).json({message: `Todo with id ${id} not found.`})
        } else {
            res.status(200).json(todo)
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    get_todo,
    post_todo,
    update_todo,
    delete_todo,
}