import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { GeneralTaskProvider } from './context/GeneralTaskContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <AuthProvider>
      <GeneralTaskProvider>

        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GeneralTaskProvider>
    </AuthProvider>


  </StrictMode>,
)
