import React from 'react'

import { useState } from 'react'
import {useParams, useNavigate} from "react-router-dom"
import appwriteServices from '../Backend/appwrite/database'
import { useEffect } from 'react'
import Container from '../Components/Container'
import PostForm from '../Components/PostForm/Postform'

const EditPost = () => {

  const navigate = useNavigate()
  const {slug }= useParams()
const [post,setPost] = useState()


  useEffect(  ()=>{
    const fetch = async()=>{

      if(slug){
        await appwriteServices.getPost(slug).then((post)=>(
          setPost(post)
        ))
      }
      else{
        navigate("/")
      }
    }
    fetch()
    
  },[slug, navigate])
 
  return (
    <div className='py-6'>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  )
}

export default EditPost
