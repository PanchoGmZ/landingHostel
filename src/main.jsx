import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Los antiguos enlaces multipágina deben desembocar en la única landing.
if (window.location.pathname !== '/') {
  window.history.replaceState(null, '', `/${window.location.search}${window.location.hash}`)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
