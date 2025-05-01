import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {createBrowserRouter,RouterProvider} from "react-router-dom"
import store from './store/store.js'
import {Provider} from 'react-redux'
import AuthLayout from './Components/AuthLayout.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import Allpost from './pages/Allpost.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Home from './pages/Home.jsx'
import Post from './pages/Post.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [{
     path:"/SignUp",
     element: (<AuthLayout authenticaton={false} >
           <SignUp/>
      </AuthLayout>)
    },
    {
      path:"/Login",
      element: (<AuthLayout authenticaton={false} >
            <Login/>
       </AuthLayout>)
     },
     {
      path:"/AllPost",
      element: (<AuthLayout authenticaton >
           <Allpost/>
       </AuthLayout>)
     },
     {
      path:"/AddPost",
      element: (<AuthLayout authenticaton>
           <AddPost/>
       </AuthLayout>)
     },
     {
      path:"/EditPost/:slug",
      element: (<AuthLayout authenticaton >
           <EditPost/>
       </AuthLayout>)
     },
    {
      path:"/",
      element:(<AuthLayout authenticaton = {false}>
              <Home/>
        </AuthLayout>)
    },
  {
    path: "/post/:slug",
    element :  (
      <AuthLayout authenticaton >

        <Post/>
      </AuthLayout>
    ) 
  }]
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
<Provider store={store}>

<RouterProvider router={router}/>
</Provider>
  </StrictMode>
)
