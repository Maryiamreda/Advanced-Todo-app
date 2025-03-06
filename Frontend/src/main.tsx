import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeProvider.tsx'
import { AppContext } from './context/AppContext.tsx'
import { AppContextProvider } from './context/AppContext.tsx'  // Import the provider, not the context

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AppContextProvider>
        <App />
      </AppContextProvider>

    </ThemeProvider>
  </StrictMode>,
)
