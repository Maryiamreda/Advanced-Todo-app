import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context/ThemeProvider';
import { AppContext } from '../context/AppContext';

type Todo = {
    _id: string;
    name: string;
    done: boolean;
}
const Todos = () => {
    const themeContext = useContext(ThemeContext);
    const appContext = useContext(AppContext);
    const { elementColor, darkgrayishblue, lightgrayishblue } = themeContext;
    const { todos, checkTodo, deleteTodo, clearCompleted } = appContext;
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [undone, setUndone] = useState(0);
    const [filterd, setFilterd] = useState<Todo[]>([]);
    const ondeleteTranition: React.CSSProperties = {
        left: " -100%",
        transition: "left 0.5s ease-in-out"
    };
    const [deleteActionId, setDeleteActionId] = useState('');


    useEffect(() => {

        const undoneTodos = (array: Todo[]) => {
            let c = 0;
            array.map((item) => { if (item.done === false) { c++; } })
            return c;
        }
        setUndone(undoneTodos(todos));
        setFilterd(todos);  // Set initial filtered state to all todos

    }, [todos])

    return (
        <div className=' element rounded flex flex-col     '
        >
            <div className=' scrollbar flex flex-col gap-3 h-80 overflow-y-scroll scroll-smooth shadow-lg md:shadow-xl '
                style={{
                    backgroundColor: elementColor, transition: "background-color 0.5s ease"
                }}
            >
                {filterd?.map((item, index) => (
                    <div className='todo border-b-[0.01px] border-b-light-grayish-blue 
                    transition duration-150 ease-in-out hover:scale-100
                  relative  left-0  hover:shadow-lg
                  '
                        style={deleteActionId === item._id ? ondeleteTranition : {}}

                        key={index}
                        onMouseEnter={() => setHoveredId(index)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        <div className=' flex justify-between cursor-pointer py-3 px-5  '>
                            <div className='flex gap-4'>
                                <div onClick={() => checkTodo(item._id)}
                                    className='check   w-5 h-5 rounded-full  cursor-pointer flex justify-center items-center'
                                    style={{
                                        border: item.done ? 'transparent' : '1px solid hsl(233, 14%, 35%)',
                                        backgroundImage: item.done ? 'linear-gradient(to right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))' : 'none'
                                    }}
                                >
                                    {item.done && <img src='/images/icon-check.svg ' />}

                                </div>
                                <div className={`${item.done ? 'line-through ' : 'no-underline'}`}
                                    style={{
                                        color: item.done ? lightgrayishblue : '',

                                    }}
                                >{item.name}</div>
                            </div>
                            {hoveredId === index && (
                                <div>
                                    <img src='/images/icon-cross.svg ' className='cursor-pointer' onClick={() => {
                                        setDeleteActionId(item._id),
                                            deleteTodo(item._id)
                                    }} />
                                </div>)}
                        </div>
                    </div>)
                )}
            </div>

            <div className=' sortoptions flex justify-between text-xs font-semibold  py-3 px-5 shadow-lg md:shadow-xl
            mt-5 md:mt-0
            '
                style={{
                    color: darkgrayishblue, transition: "color 0.5s ease, background-color 0.5s ease"
                    , backgroundColor: elementColor

                }}


            >
                <p className='cursor-pointer'>{undone} items left</p>
                <div className='flex gap-2 cursor-pointer '>
                    <button className=' cursor-pointer hover:text-Bright-Blue focus:text-Bright-Blue ' onClick={() => setFilterd(todos)}>All</button>
                    <button className=' cursor-pointer hover:text-Bright-Blue focus:text-Bright-Blue ' onClick={() => setFilterd(todos.filter(todo => !todo.done))}>Active</button>
                    <button className=' cursor-pointer hover:text-Bright-Blue focus:text-Bright-Blue ' onClick={() => setFilterd(todos.filter(todo => todo.done))}>Completed</button>
                </div>
                <p className='cursor-pointer' onClick={() => clearCompleted()}> Clear Completed</p>
            </div>
        </div >
    );
}

export default Todos;
