import React, { useContext, useState } from 'react';
import { ThemeContext } from '../ThemeProvider';

const AddTodo = () => {
    const themeContext = useContext(ThemeContext);
    const { elementColor, darkgrayishblue } = themeContext;

    return (
        <div style={{
            backgroundColor: elementColor, transition: "background-color 0.5s ease"
        }} className='element  p-3 rounded   flex  gap-4 '>

            <label className='w-5 h-5 border-1 border-gray-700 rounded-full cursor-pointer'></label>
            <div
                className=''>

                <input className='bg-transparent outline-none  ' style={{ color: darkgrayishblue }} placeholder='Create a New Todo...' />
            </div>


        </div>
    );
}

export default AddTodo;
