import React,{useEffect,useRef,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllUsers,host } from '../utils/ApiRoutes'
import Contacts from "../components/contacts"
import Welcome from "../components/welcome"
import ChatContainer from '../components/chatContainer'
import {io} from "socket.io-client"

function Chat() {
  const [currentUser,setCurrentUser] = useState(undefined)
  const [contactData,setContactData] = useState(undefined)
  const [currentChat,setCurrentChat] = useState(undefined)

  const socket = useRef()

  const navigate = useNavigate()

  useEffect(() => {
    const check = async () => {
    if(!localStorage.getItem("chat-app-user")){
      navigate("/login")
    }else{
    setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
    }
   }
   check()
  },[])

   useEffect(() => {
    if(currentUser){
    socket.current =io(host)
    socket.current.emit("add-user",currentUser._id)
    }
   },[currentUser])

  useEffect(() => {
    const fetchingUsers =async () => {
    if(currentUser){
    if(!currentUser.isAvatarSet){
      navigate("/setAvatar")
    }else{
      const res = await fetch(`${getAllUsers}/${currentUser._id}`)
      const data =await res.json()
      setContactData(data.users)
    }
    }}
    fetchingUsers()
   },[currentUser])

   const handleChange = (chat) => {
    setCurrentChat(chat)
   }


  return (
    <div className='flex w-[100vw] h-[100vh] items-center justify-center'>
    <div className='h-[85vh] w-[85vw] bg-dark rounded-md'>
    {
    contactData === undefined ? "" : 
    <div className='grid grid-cols-4 h-full'>
    <div><Contacts contacts={contactData} currentUser={currentUser} changeChat={handleChange}/></div> 
    <div className='col-span-3'>{currentChat === undefined ? <Welcome currentUser={currentUser} /> : <ChatContainer currentUser={currentUser} currentChat={currentChat} socket={socket}/>}</div>
    </div>
    }
    </div>
    </div>
  )
}

export default Chat

