import React from 'react'
import {FaPowerOff} from "react-icons/fa"
import { useNavigate } from 'react-router-dom'

function Logout() {

  const navigate = useNavigate()
  const handleLogout = () => {
   localStorage.clear()
   navigate("/login")
  }
  
  return (
    <div className='p-3 text-purple-600 absolute right-0 cursor-pointer transition-all ease-in-out duration-300 hover:text-slate-300'>
       <FaPowerOff onClick={handleLogout} size={25}  />
    </div>
  )
}

export default Logout