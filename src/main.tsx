import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Layout from './Layouts/Layout.tsx'
import Invoicing from './Views/Invoicing.tsx'
import Dashboard from './Views/Dashboard.tsx'
import Search from './Views/Search.tsx'
import Statements from './Views/Statements.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Dashboard />
      },
      {
        path: '/new',
        element: <Invoicing />
      },
      {
        path: '/search',
        element: <Search />
      },
      {
        path: '/statements',
        element: <Statements />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </React.StrictMode>,
)
