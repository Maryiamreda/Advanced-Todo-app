
import { useContext } from 'react';
import './App.css'
import AddTodo from './components/addTodo'
import Todos from './components/Todos'
import { ThemeContext } from './ThemeProvider';
function App() {
  const themeContext = useContext(ThemeContext);
  // Handle the case where ThemeContext is undefined
  if (!themeContext) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  const { theme, toggleTheme } = themeContext;

  return (
    <div className='flex flex-col gap-5 w-[400px]'>
      <div className='flex justify-between'>
        <h1 className='text-white'>T O D O</h1>
        <div onClick={toggleTheme} className='cursor-pointer'>
          {theme == 'dark' ? (<img src='/images/icon-sun.svg' />) : (<img src='/images/icon-moon.svg' />)}

        </div>
      </div>

      <AddTodo />
      <Todos />


    </div>
  )
}

export default App
