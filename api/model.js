import mongoose from 'mongoose'
const todoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    done: { type: Boolean, required: false }
},
    {
        timestamps: true,
        collection: 'todos'  // Explicitly set collection name to match MongoDB Atlas

    }
);
const Todo = mongoose.model('Todo', todoSchema);
export default Todo;