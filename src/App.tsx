
import './App.css'
import AddTodo from './components/addTodo'
import Todos from './components/Todos'

function App() {

  return (
    <div className='flex flex-col gap-5 w-[400px]'>
      <div>
        <h1 className='text-white'>T O D O</h1>
      </div>

      <AddTodo />
      <Todos />


    </div>
  )
}

export default App
