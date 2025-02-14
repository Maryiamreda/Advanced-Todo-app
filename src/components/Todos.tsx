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
            console.log(response.data.todos)
        })
    }, [])
    return (
        <div>
            {todos.map((item, index) => (<div className='text-white'>{item.name}</div>))}
        </div>
    );
}

export default Todos;
