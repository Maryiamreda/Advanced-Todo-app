import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../ThemeProvider';

const baseURL = "http://localhost:3000/";

type Todo = {
    name: string;
    done: boolean;
}
const Todos = () => {
    const themeContext = useContext(ThemeContext);
    const { elementColor, lightgrayishblue } = themeContext;

    const [todos, setTodos] = useState<Todo[]>([]);
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [undone, setUndone] = useState(0)
    const undoneTodos = (array: Todo[]) => {
        let c = 0;
        array.map((item) => { if (item.done === false) { c++ } })
        return c;
    }
    useEffect(() => {
        axios.get(baseURL).then((response) => {
            setTodos(response.data.todos);
            console.log(response);
            setUndone(undoneTodos(response.data.todos))

        })
    }, [])
    useEffect(() => {
        setUndone(undoneTodos(todos))

    }, [todos])
    return (
        <div className=' element rounded flex flex-col shadow-lg md:shadow-xl  ' style={{
            backgroundColor: elementColor, transition: "background-color 0.5s ease"
        }}>
            <div className='flex flex-col gap-3 '>
                {todos.map((item, index) => (
                    <div className='border-b-[0.01px] border-b-light-grayish-blue transition duration-150 ease-in-out hover:scale-100  hover:shadow-lg
'
                        key={index}
                        onMouseEnter={() => setHoveredId(index)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        <div className=' flex justify-between cursor-pointer py-3 px-5 '>
                            <div className='flex gap-4'>
                                {item.done ? (<div className='check  w-5 h-5 rounded-full cursor-pointer flex justify-center items-center'><img src='/images/icon-check.svg ' /></div>) : (<label className='w-5 h-5 border-1 border-gray-700 rounded-full cursor-pointer'></label>
                                )}

                                <div className=''>{item.name}</div>
                            </div>
                            {hoveredId === index && (
                                <div>
                                    <img src='/images/icon-cross.svg ' className='cursor-pointer' />
                                </div>)}
                        </div>


                    </div>))}
            </div>

            <div className='flex justify-between text-xs font-semibold  py-3 px-5 '
                style={{
                    color: lightgrayishblue, transition: "color 0.5s ease"
                }}
            >
                <p className='cursor-pointer'>{undone} items left</p>
                <div className='flex gap-2 cursor-pointer'>
                    <p>All</p>
                    <p>Active</p>
                    <p>Completed</p>
                </div>
                <p className='cursor-pointer'> Clear Completed</p>
            </div>
        </div>
    );
}

export default Todos;
