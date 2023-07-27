import React, { useState,useEffect } from 'react'
import {BsChatRightDotsFill} from "react-icons/bs"
import {LuEye,LuEyeOff} from "react-icons/lu"
import {Link, useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { registerRoute } from '../utils/ApiRoutes';

function Register() {

  const navigate = useNavigate()

  const [showPass,setshowPass] = useState(false)
  const [showConfirmPass,setshowConfirmPass] = useState(false)

  useEffect(() => {
    if(localStorage.getItem("chat-app-user")){
      navigate("/")
    }
  })

  const initialForm = {
    username:"",
    email:"",
    password:"",
    confirmPassword:""
  }
  
  const [value,setvalue] = useState(initialForm)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {username,password,email} = value
    if(handleValidation()){
      const res = await axios.post(registerRoute,{
        username,
        email,
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
    const {username,password,confirmPassword} = value
    if(password.length < 6 ){
      toast.error("password length must be greater than 5",toastError)
      return false
    }
    else if(password !== confirmPassword){

      toast.error("password and confirm password must be same",toastError)
      return false
    }
    else if(username.length < 3 ){
      toast.error("username length must be greater than 2",toastError)
      return false
    }
    return true
    
  }

  const handleShow = (e) => {
    const id = e.currentTarget.id
    if(id === "confirmPassIcon"){
      setshowConfirmPass(!showConfirmPass)
    }else{
      setshowPass(!showPass)
    }
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
       <input type="text" name='email' required placeholder='email' className='rounded-md px-4 py-2 bg-dark border-2 border-violet' onChange={(e) =>handleChange(e)}/>
       <div className='rounded-md px-4 py-2 bg-dark border-2 border-violet flex justify-between items-center hover:ring-white hover:ring-1 hover:border-transparent'>
       <input type={showPass ? "text" : "password"} name='password' className='bg-dark focus:outline-none' required placeholder='password'  onChange={(e) =>handleChange(e)}/>
       <span id="PassIcon" className='text-purple-400 cursor-pointer hover:text-white' onClick={(e) => handleShow(e)}>{showPass ? <LuEyeOff size={20}/> : <LuEye size={20}/>}</span>
       </div>
       <div className='rounded-md px-4 py-2 bg-dark border-2 border-violet flex justify-between focus:ring-1  hover:ring-white hover:ring-1 hover:border-transparent'>
       <input type={showConfirmPass ? "text" : "password"} name='confirmPassword'   className='bg-dark focus:outline-none' required placeholder='confirmPassword'  onChange={(e) =>handleChange(e)}/>
       <span id="confirmPassIcon" className='text-purple-400 cursor-pointer hover:text-white' onClick={(e) => handleShow(e)}>{showConfirmPass ? <LuEyeOff size={20}/> : <LuEye size={20}/>}</span>
       </div>
       <button type="submit" className='uppercase text-lg bg-violet rounded-md py-1 tracking-wide text-white hover:bg-violet1 transition ease-in-out duration-300' >create user</button>
      </form>
      <div className='text-center mt-5'>Already have an account? <Link to="/login" className='uppercase text-lg tracking-wide hover:text-violet  transition ease-in-out duration-300'>login</Link></div>
    </div>
     <ToastContainer/>
    </div>
  )
}

export default Register