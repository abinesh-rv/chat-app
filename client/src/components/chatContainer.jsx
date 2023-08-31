import React, { useEffect, useRef, useState } from 'react'
import Logout from './Logout'
import ChatInput from './chatInput'
import { addMsg, getMsg } from '../utils/ApiRoutes'
import {toast,ToastContainer} from "react-toastify"


function ChatContainer({currentChat,currentUser,socket}) {

  const [messages,setMessages] = useState([])
  const scrollRef = useRef()
  const [arrivalMsg,setArrivalMsg] = useState(null)

  const handleChat = async (msg) => {

  socket.current.emit("send-msg",{
    to:currentChat._id,
    from:currentUser._id,
    msg
  })

  const msgs = [...messages]
  msgs.push({fromSelf:true,message:msg})
  setMessages(msgs)

  const res = await fetch(`${addMsg}`,{
    method:"POST",
    headers:{'content-type':'application/json'},
    body:JSON.stringify({
      from:currentUser,
      to:currentChat,
      message:msg
    })
  })

  const toastError = {
    position:"bottom-right",
    autoClose:8000,
    draggable:true,
    pauseOnHover:true,
    theme:"dark"
  }
  if(!res.ok){
    const notify = await res.json().msg
    toast.error(notify,toastError)
  }
  
  }

  useEffect(() => {
  fetching()
  },[currentChat])

  const fetching = async () => {
    const res = await fetch(`${getMsg}`,{
      method:"POST",
      headers:{'content-type':'application/json'},
      body:JSON.stringify({
        from:currentUser._id,
        to:currentChat._id,
      })
    })
    const chatMessage =await res.json()
    setMessages(chatMessage)
  }

  useEffect(() => {
    if(socket.current){
      socket.current.on("receive-msg",(msg) => {
        setArrivalMsg({fromSelf:false,message:msg})
      })
    }
  },[])

  useEffect(() => {
    arrivalMsg && setMessages((pre) => [...pre,arrivalMsg])
  },[arrivalMsg])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior : "smooth"})
  },[messages])

  return (
    <div className='relative h-[95vh] md:h-[85vh] w-full flex flex-col justify-between'>
        <Logout/>
        <div className="p-3 flex items-center gap-3 capitalize">
            <img className="md:w-11 md:h-11 w-7 h-7"  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt=""/>
            <div className="md:text-xl text-lg tracking-wider">{currentChat.username}</div>
        </div>
        <div className='h-full w-full flex flex-col gap-3 overflow-y-scroll self-start p-3 chatContainer'>
          {messages.map(msg => {
            return (
                 <div className={`w-fit md:max-w-[30rem] max-w-[12rem] text-sm md:text-base h-fit px-2 py-1  ${msg.fromSelf ? "bg-slate-100 text-black rounded-l-full self-end " : "text-slate-100 bg-purple-700 rounded-r-full"}`}>{msg.message}</div>
            )
          })}
        </div>
        <div><ChatInput handleChat={handleChat}/></div>
        <ToastContainer/>
    </div>
  )
}

export default ChatContainer