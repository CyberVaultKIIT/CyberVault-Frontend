import React, { StrictMode } from 'react' // Import React
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./assets/styles/base/globals.module.scss";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
