import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/global.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { FormProvider } from "./components/FormContext.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <BrowserRouter>
    <FormProvider>
    <App />
    </FormProvider>
    </BrowserRouter>
  </StrictMode>,
)
