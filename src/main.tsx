import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { GeneralTaskProvider } from './context/GeneralTaskContext.tsx'
import { NewJobProvider } from './context/NewJobContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <AuthProvider>
      <GeneralTaskProvider>
        <NewJobProvider>

          <BrowserRouter>
            <App />
          </BrowserRouter>
        </NewJobProvider>

      </GeneralTaskProvider>
    </AuthProvider>


  </StrictMode>,
)
