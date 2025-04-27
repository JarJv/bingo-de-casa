import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Roleta from './pages/Roleta.jsx'
import Cartela from './pages/Cartela.jsx'

let router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/roleta",
    element: <Roleta/>
  },
  {
    path: "/cartela",
    element: <Cartela/>
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
