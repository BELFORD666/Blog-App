import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const AuthLayout = ({children,authenticaton=true}) => {

  const authStatus = useSelector((state)=>{
    return state.auth.status;
  })
  const navigator = useNavigate();
  const [Loader,setLoader] = useState(true);
  useEffect(()=>{
    if(authenticaton && authStatus!==authenticaton){
      navigator("/Login")
    }
    else if(!authenticaton && authStatus!== authenticaton){
      navigator("/")
    }
    setLoader(false)
  },[authStatus,authenticaton,navigator])

  return (
    Loader? null : <> {children} </>
   
  )
}

export default AuthLayout
