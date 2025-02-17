//this to store logic for doctor login and token 
import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
// Define the Todo interface
interface Todo {
    name: string;
    done: boolean;
}

// Define the context type including both state and setter
interface TodoContextType {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    addTodo: (todo: string) => void;  // Changed type to match implementation
}
const baseURL = "http://localhost:3000/";

// Create context with proper type and default value
export const AppContext = createContext<TodoContextType>({
    todos: [],
    setTodos: () => { },
    addTodo: () => { },
});

interface AppProviderProps {
    children: ReactNode;
}

export const AppContextProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodo = (todo: string) => {  // Moved outside useEffect
        axios.post(`${baseURL}add-todo`, {
            todo: todo
        })
            .then(function (response) {
                console.log(response);
                setTodos(prev => [...prev, { name: todo, done: false }]);  // Update local state
            })
            .catch(function (error) {
                console.log(error);
            });
    }



    useEffect(() => {

        const fetchTodos = async () => {
            try {
                const response = await axios.get(baseURL);
                setTodos(response.data.todos);
            } catch (error) {
                console.error("Error fetching todos:", error);
            }
        };
        fetchTodos();
    }, []);
    return (
        <AppContext.Provider value={{ todos, setTodos, addTodo }}>
            {children}
        </AppContext.Provider>
    );
};
export default AppContextProvider;