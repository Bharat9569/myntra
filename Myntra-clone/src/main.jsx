import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './routes/App.jsx'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Bag from './routes/Bag.jsx'
import Home from './routes/Home.jsx'
import {Provider} from 'react-redux';
import myntaStore from './store/myntaStore.js'
import ProtectedRoute from './components/protectedroute.jsx'
import Login from './components/auth.jsx'
import AdminPanel from './components/admin.jsx'
import AdminRoute from './components/adminroute.jsx'


const router=createBrowserRouter([
  { path: '/login', element: <Login /> },
  { path: '/admin',element: (
    <AdminRoute>
     <AdminPanel />
     </AdminRoute>
      )},
  {
  path:"/",
  element:(
  <ProtectedRoute>
    <App/>
    </ProtectedRoute>
    ),
  children:[ 
    
    { path:"/",  element:<Home/>},
    
    { path:"/bag",    element:<Bag/>},
   
    
  ]
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={myntaStore}>
    <RouterProvider router={router}/>
    </Provider>

  </StrictMode>
)
