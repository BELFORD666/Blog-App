
import React,{useCallback, useState} from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from '../Input';
import Select from '../Select'
import RTE from '../RTE'
import Button from '../Button'
import appwrite from '../../Backend/appwrite/bucket'
import appwritedatabase from '../../Backend/appwrite/database'


export  default function PostForm ({post}){
     const [loading,setLoading] = useState(false);
   
    const {register, handleSubmit, control,getValues,setValue, watch, formState: { errors },reset} = useForm({
        defaultValues: {
            title : post? post.title: "",
            slug : post? post.slug:"",
            content : post? post.content:"",
            status : post? post.status:""
        }
    })
    React.useEffect(() => {
        if (post) {
            reset({
                title: post.title,
                slug: post.slug,
                content: post.content,
                status: post.status
            });
        }
       
    }, [post, reset]);
    
    const slugTransform = useCallback((value)=>{
        
        if(value && typeof value === "string"){
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, '-')
            .replace(/\s/g, "-")
        }
    }
    ,[])
    React.useEffect(()=>{
        watch((value,{name})=>{
            if(name==="title"){
                setValue("slug",slugTransform(value.title))
            }
            
        })
    },[watch,slugTransform,setValue])
    const user = useSelector((state)=>state.auth.user)
    
    
    const navigate = useNavigate()
   
    const submit = async (data)=>{
        if(post){
              setLoading(true);
                const file = data.image[0] ? await appwrite.createFile(data.image[0]) : null
                if(file){
                    await appwrite.deleteFile(post.featuredImage)
                    post.featuredImage = file.$id
                }
                
                const dbPost = await appwritedatabase.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined 
                })
                if (dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            setLoading(false)
            
            }
        else{
            setLoading(true)
           const  file = await appwrite.createFile(data.image[0])
            if(file){
                const fileId = file.$id
                
                const dbPost =await  appwritedatabase.createPost({
                    ...data,
                    featuredImage : fileId,
                    userid : user.$id
                })
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }

            }
            setLoading(false)
        }}
      return (
        <form  className="flex flex-wrap"
        onSubmit={handleSubmit(submit)} >
            <div  className="w-2/3 px-2">

            <Input
            label = "title"
            placeholder = "title"
            className="mb-4"
            {...register("title",{required:"tittle is required"})}
            />
            {errors.title && <p className="text-red-600 mt-8 text-center">{errors.title.message}</p>}
            <Input
            label = "slug"
            placeholder = "slug"
             className="mb-4"
              {...register("slug",{required:"slug is required"})}
              onInput = {
                (e)=>{
                setValue("slug",slugTransform(e.currentTarget.value),{shouldValidate:true})
                }
              }

            />
            {errors.slug && <p className="text-red-600 mt-8 text-center">{errors.slug.message}</p>}
            <RTE 
            label= "Realtime Editor"
            name= "content"
            control={control}
            defaultvalues={getValues("content")}
            
            />
            {errors.content && <p className="text-red-600 mt-8 text-center">{errors.content.message}</p>}
            
            </div>
            <div  className="1/3 px-2">
            <Input
            label = "Feautured Image"
            type = "file" 
            className="mb-4"
            accept = "image/png, image/jpg, image/jpeg"
            {...register("image",{required: !post})}
            
            />
            
            {
                post && <div
                className="w-full mb-4">
                    <img src={appwrite.getPreview(post.featuredImage)} alt={post.title}
                    className="rounded-lg" />
                </div>


            }
            
            <Select  
            options ={["active","inactive"]}
            label = "status"
             className="mb-4"
             {...register("status",{required:"Reqired"})}
            />
            {errors.status && <p className="text-red-600 mt-8 text-center">{errors.status.message}</p>}
            <Button
            type="submit"
            bgColor={post ? "bg-green-500": undefined}
                className="w-full"
            >
       {post ? (
    loading ? "Loading..." : "Update"
) : (
    loading ? "Loading..." : "Submit"
)}

            </Button>
            </div>
            {errors.root && <p className="text-red-600 mt-8 text-center">{errors.root.message}</p>}

        </form>
      )

}
    


