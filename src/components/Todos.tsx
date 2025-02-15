import axios from 'axios';
import React, { useEffect, useState } from 'react';
const baseURL = "http://localhost:3000/";

type Todo = {
    name: string;
    done: boolean;
}
const Todos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    useEffect(() => {
        axios.get(baseURL).then((response) => {
            setTodos(response.data.todos);
            console.log(response)
        })
    }, [])
    return (
        <div className='bg-dark-Desaturated-Blue p-3 rounded flex flex-col gap-3'>

            {todos.map((item) => (
                <div className='text-white flex gap-4'>
                    <label className='w-5 h-5 border-1 border-gray-700 rounded-full'></label>

                    <div>{item.name}</div>
                </div>))}
        </div>
    );
}

export default Todos;
