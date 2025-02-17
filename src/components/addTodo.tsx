import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../ThemeProvider';
import axios from 'axios';

const AddTodo = () => {
    const [todo, setTodo] = useState('');
    const themeContext = useContext(ThemeContext);
    const { elementColor, darkgrayishblue } = themeContext;
    const addTodo = (todo: string) => {
        axios.post('http://localhost:3000/add-todo', {
            todo: todo
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div style={{
            backgroundColor: elementColor, transition: "background-color 0.5s ease"
        }} className='element  p-3 rounded   flex  gap-4 '>

            <label className='w-5 h-5 border-1 border-gray-700 rounded-full cursor-pointer'
                onClick={() => addTodo(todo)}
            ></label>
            <div className=''>
                <input className='bg-transparent outline-none ' onChange={(e) => setTodo(e.target.value)} style={{ color: darkgrayishblue }} placeholder='Create a New Todo...' />
            </div>

        </div>
    );
}

export default AddTodo;
