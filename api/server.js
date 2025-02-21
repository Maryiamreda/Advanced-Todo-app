import express from 'express';
import mongoose from 'mongoose';
import Todo from '../src/model.js';
import cors from 'cors'   // correct

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));

// Add middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbURL = 'mongodb+srv://useraccess:7878788788@cluster0.r9zdppo.mongodb.net/todolist?retryWrites=true&w=majority';

mongoose.connect(dbURL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(3000, () => {
            console.log('Server running on port 3000');
        });
    })
    .catch((err) => console.log('MongoDB connection error:', err));


// Add a GET route for testing

app.get('/', async (req, res) => {
    try {
        const todos = await Todo.find({}); // Correctly formatted
        res.json({
            success: true,
            todos,
        });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
})
// Add a POST route for actually creating todos
app.post('/add-todo', (req, res) => {
    console.log('Attempting to create new todo');
    const { todo } = req.body;

    if (!todo) {
        return res.status(400).json({ success: false, message: 'Todo field is required' });
    }

    const addtodo = new Todo({
        name: todo,
        done: false
    });
    addtodo.save()
        .then((result) => {
            console.log('Todo saved successfully:', result);
            res.json(result);
        })
        .catch((err) => {
            console.error('Error saving todo:', err);
            res.status(500).json({ error: 'Error saving todo', details: err.message });
        });
});

//delete todo
app.delete('/delete-todo/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ success: false, message: 'id required' });
    }
    try {
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ success: false, message: 'id not found' });
        }
        res.json({
            success: true,
            deletedTodo,
        });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
})

//togelle todo state 
app.put('/update-todo/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ success: false, message: 'id required' });
    }
    try {
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ success: false, message: 'id not found' });
        }

        // Toggle the `done` state
        todo.done = !todo.done;
        await todo.save(); // Save the updated document
        res.json({
            success: true,
            todo,
        });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

)
// Delete all completed todos
app.delete('/delete-todo-completed', async (req, res) => {
    try {
        const todosToDelete = await Todo.find({ done: true }).select('_id');
        const deletedIds = todosToDelete.map(todo => todo._id);
        const result = await Todo.deleteMany({ done: true });
        console.log('Deleted completed todos:', result);
        res.json({
            success: true,
            deletedCount: result.deletedCount,
            deletedIds: deletedIds
        });
    } catch (error) {
        console.error('Error deleting completed todos:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

