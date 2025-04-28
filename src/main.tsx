
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'

// Make sure we have a valid DOM element before rendering
const rootElement = document.getElementById('root')

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Toaster position="top-right" />
      <App />
    </React.StrictMode>,
  )
} else {
  console.error('Root element not found')
}