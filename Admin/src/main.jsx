import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AdminProvider } from './context/admin/AdminContext.jsx'
import { ClientProvider } from './context/client/ClientContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AdminProvider>
      <ClientProvider>
    <App />
    </ClientProvider>
    </AdminProvider>
    </BrowserRouter>
  </StrictMode>,
)
