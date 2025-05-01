import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../Container'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Logout from './Logout'
import Logo from '../Logo'
const Header = () => {
    const navigate = useNavigate();
    const authStatus = useSelector((auth)=>(auth.auth.status))
    const navItems = [{
        name : "Home",
        slug : "/",
        status : true
    },
    {
        name : "Login",
        slug : "/Login",
        status : !authStatus
    
    },
    {
    name : "Signup",
    slug : "/Signup",
    status : !authStatus
},
{
    name : "AllPosts",
    slug : "/AllPost",
    status : authStatus
},
{
    name : "AddPost",
    slug : "/AddPost",
    status : authStatus
    
}]

return (
    <header className='py-3 shadow bg-gray-500'>
    <Container>

       <nav>
        <div  className='flex'>
            <Link to={"/"}>
            <Logo/>
            </Link>
        </div>
        <ul className='flex ml-auto'>
            {
                navItems.map((item)=>(item.status? 
                    <li key={item.name}>

                    <button onClick={()=>navigate(item.slug)}
                     className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
                        {item.name}
                    </button>
                   </li> :null))
            }
           
            {authStatus === true ? <Logout /> : null}
        </ul>
       </nav>
    </Container>
   </header>
  )
}

export default Header
