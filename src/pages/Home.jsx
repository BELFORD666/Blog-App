import React from 'react'
import appwriteService from "../Backend/appwrite/database"
import { useState } from 'react'
import { useEffect } from 'react'
import Container from '../Components/Container'
import PostCard from '../Components/PostCard'

const Home = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])
  if(posts.length===0) return  <p className="text-center w-full text-gray-500 text-lg">You must be logged in to see the posts</p>
  return (
    <div className='w-full py-8'>
    <Container>
      <div className="flex flex-wrap">
        {posts.map((post) => (
          <div className="p-2 w-1/4" key={post.$id}>
            <PostCard {...post} />
          </div>
        ))}
      </div>
    </Container>
  </div>
  )
}

export default Home
