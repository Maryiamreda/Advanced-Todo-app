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
app.post('/addtodo', (req, res) => {
    console.log('Attempting to create new todo');
    // const todo = new Todo({
    //     name: 'call your mom',
    //     done: true
    // });

    // todo.save()
    //     .then((result) => {
    //         console.log('Todo saved successfully:', result);
    //         res.json(result);
    //     })
    //     .catch((err) => {
    //         console.error('Error saving todo:', err);
    //         res.status(500).json({ error: 'Error saving todo', details: err.message });
    //     });
});
