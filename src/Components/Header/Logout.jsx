import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../Backend/appwrite/auth'
import {logout} from '../../store/AuthSlice'

const Logout = () => {

 const dispatch = useDispatch();
    
const LogoutHandler= ()=>{
    authService.logout().then(
      () => {
        dispatch(logout());  
      }
    )
}


  return (
   <button onClick={LogoutHandler}
   className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
    LogOut
   </button>
  )
}

export default Logout
