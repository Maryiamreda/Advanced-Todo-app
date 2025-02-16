import axios from 'axios';
import { useEffect, useState } from 'react';
const baseURL = "http://localhost:3000/";

type Todo = {
    name: string;
    done: boolean;
}
const Todos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    useEffect(() => {
        axios.get(baseURL).then((response) => {
            setTodos(response.data.todos);
            console.log(response)
        })
    }, [])
    return (
        <div className='bg-dark-Desaturated-Blue rounded flex flex-col gap-3 '>

            {todos.map((item, index) => (
                <div className='border-b-[0.01px] border-b-light-grayish-blue'
                    key={index}
                    onMouseEnter={() => setHoveredId(index)}
                    onMouseLeave={() => setHoveredId(null)}
                >
                    <div className='text-white flex justify-between cursor-pointer py-3 px-5 '>
                        <div className='flex gap-4'>
                            <label className='w-5 h-5 border-1 border-gray-700 rounded-full cursor-pointer'></label>

                            <div>{item.name}</div>
                        </div>
                        {hoveredId === index && (
                            <div>
                                <img src='/images/icon-cross.svg ' className='cursor-pointer' />
                            </div>)}
                    </div>


                </div>))}
        </div>
    );
}

export default Todos;
