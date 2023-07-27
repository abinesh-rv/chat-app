import React, { useEffect, useState } from 'react'
import {LuEye,LuEyeOff} from "react-icons/lu"
import {BsChatRightDotsFill} from "react-icons/bs"
import {Link, useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { loginRoute} from '../utils/ApiRoutes';

function Register() {

  const navigate = useNavigate()

  const [showPass,setshowPass] = useState(false)

  useEffect(() => {
    if(localStorage.getItem("chat-app-user")){
      navigate("/")
    }
  })
  
  const initialForm = {
    username:"",
    password:"",
  }
  
  const [value,setvalue] = useState(initialForm)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {username,password} = value
    if(handleValidation()){
      const res = await axios.post(loginRoute,{
        username,
        password
      })
      if(res.data.status === false){
        toast.error(res.data.msg,toastError)
      }
      else{
        localStorage.setItem("chat-app-user",JSON.stringify(res.data.user));
        navigate("/")
      }
    }
  }

  const toastError = {
    position:"bottom-right",
    autoClose:8000,
    draggable:true,
    pauseOnHover:true,
    theme:"dark"
  }
   
  const handleValidation = () => {
    const {username,password} = value
    if(password.length < 6 ){
      toast.error("password length must be greater than 5",toastError)
      return false
    }
    else if(username.length < 3 ){
      toast.error("username length must be greater than 2",toastError)
      return false
    }
    return true
 
  }

  const handleChange = (e) => {
    setvalue({...value,[e.target.name]:e.target.value})
  }



  return (
    <div>
      <div className='w-[500px] mx-auto bg-dark rounded-md mt-[200px] py-10 '>
        <div className='flex items-center gap-2 text-4xl uppercase justify-center pb-5'>
          <BsChatRightDotsFill color="rgb(123, 7, 138)"/>
          <span>RVchat</span>
        </div>
      <form className='flex flex-col mx-24 gap-6 text-gray-300' onSubmit={handleSubmit}>
       <input type="text" name='username' required placeholder='username' className='rounded-md px-4 py-2 bg-dark border-2 border-violet' onChange={(e) =>handleChange(e)}/>
       <div className='rounded-md px-4 py-2 bg-dark border-2 border-violet flex justify-between items-center hover:ring-white hover:ring-1 hover:border-transparent'>
       <input type={showPass ? "text" : "password"} name='password' className='bg-dark focus:outline-none ' required placeholder='password'  onChange={(e) =>handleChange(e)}/>
       <span className='text-purple-400 cursor-pointer hover:text-white' onClick={() => setshowPass(!showPass)}>{showPass ? <LuEyeOff size={20}/> : <LuEye size={20}/>}</span>
       </div>
       <button type="submit" className='uppercase text-lg bg-violet rounded-md py-1 tracking-wide text-white hover:bg-violet1 transition ease-in-out duration-300'>login</button>
      </form>
      <div className='text-center mt-5'>Don't have an account? <Link to="/register" className='uppercase text-lg tracking-wide hover:text-violet  transition ease-in-out duration-300'>register</Link></div>
    </div>
     <ToastContainer/>
    </div>
  )
}

export default Register