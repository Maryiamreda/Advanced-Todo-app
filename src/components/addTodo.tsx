import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context/ThemeProvider';
import { AppContext } from '../context/AppContext';

const AddTodo = () => {
    const [todo, setTodo] = useState('');
    const themeContext = useContext(ThemeContext);
    const appContext = useContext(AppContext);
    const { elementColor, darkgrayishblue } = themeContext;
    const { addTodo } = appContext;
    useEffect(() => { }, [todo])
    return (
        <div style={{
            backgroundColor: elementColor, transition: "background-color 0.5s ease"
        }} className='element  p-3 rounded   flex  gap-4 '>

            <label className='w-5 h-5 border-1 border-gray-700 rounded-full cursor-pointer'
                onClick={() => { addTodo(todo), setTodo('') }}
            ></label>
            <div className=''>
                <input className='bg-transparent outline-none ' value={todo}
                    onChange={(e) => setTodo(e.target.value)} style={{ color: darkgrayishblue }} placeholder='Create a New Todo...' />
            </div>

        </div>
    );
}

export default AddTodo;
