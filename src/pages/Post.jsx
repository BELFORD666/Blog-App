import React,{useEffect,useState} from 'react'
import { Link,useParams,useNavigate } from 'react-router-dom'
import appwriteService from '../Backend/appwrite/database'
import appwriteBucket from '../Backend/appwrite/bucket'
import Button from '../Components/Button'
import Container from '../Components/Container'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'
const Post = () => {
  const navigate = useNavigate()
  const {slug }= useParams()
const [post,setPost] = useState()
const userData = useSelector((store)=>(store.auth.user))

useEffect(  ()=>{
  if (slug) {
    appwriteService.getPost(slug).then((post) => {
      if (post) {
        console.log(post)
        setPost(post)
      }else {
        navigate("/")
      }
    })
  }

},[slug, navigate])

const isAuthor = post && userData ? post.userid === userData.$id : false

const deletePost = async()=>{
       await appwriteService.deletePost(post.$id).then((status)=>{

         if(status){
           appwriteBucket.deleteFile(post.featuredImage)
           navigate("/")
         }
       }
       )
}
useEffect(() => {
  if (post && post.featuredImage) {
    const imageUrl = appwriteBucket.getPreview(post.featuredImage);
    console.log("Image URL:", imageUrl);
  }
}, [post]);

  return post ?(
    <div className="py-8">
      <Container>
        <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
          <img src={appwriteBucket.getPreview(post.featuredImage)} alt={post.title} className='rounded-xl' />
          { isAuthor && (
            <div className="absolute-right-6 top-6">
              <Link to={`/EditPost/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">Edit</Button>
              </Link>
              <Button bgColor="bg-red-500" 
              onClick={deletePost}
              >Delete</Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <div className="browser-css">
            {parse(post.content)}
          </div>
        </div>
      </Container>
    </div>
  ) : null
}

export default Post
