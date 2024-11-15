import React from 'react'
import ReactDOM from 'react-dom/client'
import { ContextProvider } from './contexts/contextProvider.jsx'
import { RouterProvider } from 'react-router-dom'
import routes from './router.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={routes} />
    </ContextProvider>
  </React.StrictMode>,
)
