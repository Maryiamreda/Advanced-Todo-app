import mongoose from 'mongoose'
const todoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    done: { type: Boolean, required: false }
},
    { timestamps: true }
);
const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;