import React, { useEffect, useState } from 'react'
import { useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loader from "../assets/loader.gif";
import { Buffer } from 'buffer';
import { setAvatar } from '../utils/ApiRoutes';

function SetAvatar() {

  const [avatars,setAvatars] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  const [selectedAvatar,setSelectedAvatar] = useState(undefined)
  
  const api = "https://api.multiavatar.com"
  const navigate = useNavigate()

  const toastError = {
    position:"bottom-right",
    autoClose:8000,
    draggable:true,
    pauseOnHover:true,
    theme:"dark"
  }

  const setProfile =async () => {

  if(selectedAvatar === undefined) {toast.error("please select an avatar",toastError)}
  else{
  const user = await JSON.parse(localStorage.getItem("chat-app-user"))
  const res = await fetch(`${setAvatar}/${user._id}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image:avatars[selectedAvatar]
    })  
  })

  const data =await res.json()
   

  
  if(data.avatarImage === avatars[selectedAvatar]){
      user.isAvatarSet=true
      user.avatarImage=data.avatarImage
      localStorage.setItem("chat-app-user",JSON.stringify(user))
      navigate("/")
    }
  else{
      toast.error("error setting avatar,please try again later",toastError)
    }
    
  }
  }
  
  const fetchData = async () => {
    const data = []
    for(let i=0;i<5;i++){
      const res = await fetch(`${api}/${Math.round(Math.random() * 1000)}`)
      const image =await res.text()
      const buffer = new Buffer(image)
      data.push(buffer.toString("base64"))
    }
    setAvatars(data)  
    setIsLoading(false)
  }     

  useEffect(() => {
    if(!localStorage.getItem("chat-app-user")){
      navigate("/login")
    }else{
    fetchData()
    }
  },[])


  return (
    <>
    {
    isLoading === true ? 
    <div className='w-fit mx-auto mt-48'><img src={loader} alt="" /></div> 
    :
    <div>
    <div className='flex flex-col gap-10 mt-[250px] items-center'>
        <div className='text-2xl'>Pick an avatar as your profile picture</div>
        <div  className="flex gap-6">
          {avatars.map((avatar,index) => {
            return (  
              <div key={index} className={` ${selectedAvatar === index ? "border-4 p-1 rounded-full border-violet" : ""} `}>
                 <img className='w-16 h-16 cursor-pointer' src={`data:image/svg+xml;base64,${avatar}`} alt="" onClick={() => setSelectedAvatar(index)} />
              </div>
            )
          })}
        </div>
        <button onClick={setProfile} className='uppercase text-lg bg-violet rounded-md py-2 px-3 tracking-wider text-white hover:bg-violet1 transition ease-in-out duration-300'>set as profile picture</button>
    </div>
    <ToastContainer/>
    </div>
    }
    </>
  )
}

export default SetAvatar