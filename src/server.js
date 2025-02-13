import express from 'express';
import mongoose from 'mongoose';
import Todo from './model.js';

const app = express();

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
app.get('/addtodo', (req, res) => {
    res.send('GET /addtodo endpoint is working');
});
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
app.delete('/delete-todo', async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ success: false, message: 'Todo field is required' });
    }
    try {
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ success: false, message: 'Todo not found' });
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
