import React, { useState } from 'react';

const AddTodo = () => {
    return (
        <div className='bg-dark-Desaturated-Blue p-3 rounded  flex  gap-4 '>

            <label className='w-5 h-5 border-1 border-gray-700 rounded-full cursor-pointer'></label>
            <div
                className=''>

                <input className='bg-transparent outline-none  ' placeholder='Create a New Todo...' />
            </div>


        </div>
    );
}

export default AddTodo;
