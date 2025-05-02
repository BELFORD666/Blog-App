import React,{useState} from 'react'
import authservice from '../Backend/appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import Button from './Button'
import Logo from './Logo'
import Input from './Input'
import { useForm } from 'react-hook-form'
import { useDispatch,useSelector } from 'react-redux'
import { login as authLogin } from '../store/AuthSlice'

const Login = () => {
            const{register,handleSubmit} = useForm()
            const dispatch = useDispatch()
            const[error,setError] = useState()
            const navigate = useNavigate()
           
            const[loading,setLoading] = useState(false);

       const login = async (data)=>{
        setError("")
        try{

            setLoading(true);
            const session = await authservice.login(data);
            if(session){
                const user =await authservice.getUser()
                
                if(user){
                    dispatch(authLogin({user}))
                    navigate("/")
                }
            }
        }
        catch(error){
            setLoading(false)
            setError(error.message);
        }
       }

  return (
    <div className="flex items-center justify-center w-full">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className="mt-8">
                    <div className="space-y-5">
                        <Input
                            label="Email : "
                            placeholder="Email Address"
                            type="email"
                            {...register("email", {
                                required: true,
                                
                            })}
                        />
                        <Input
                            label="Password : "
                            type="password"
                            placeholder="Password"
                            {...register("password", { required: true })}
                        />
                        <Button type="submit" className="w-full">
                           {loading===true ? "Loading": "Login"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
  
}

export { Login}
