import React, { useState } from 'react'
import EmojiPicker from "emoji-picker-react"
import {BsFillEmojiSunglassesFill} from "react-icons/bs"
import {AiOutlineSend} from "react-icons/ai"

function ChatInput({handleChat}) {

  const [ShowPicker,setShowPicker] = useState(false)
  const [msg,setMsg] = useState("")

  const handleShowEmojiClick = () => {
    setShowPicker((value) => !value)
  }

  const sendMsg = (e) => {
     e.preventDefault()
     if(msg.length > 0){
     handleChat(msg)
     setMsg("")
     }
  }

  const handleEmojiClick = (emojiData,event) => {
    let message = msg
    message += emojiData.emoji
    setMsg(message)
  } 

  return (
    <div>
    <div className='px-3'>{ShowPicker && <EmojiPicker  onEmojiClick={handleEmojiClick} emojiStyle='google' theme='dark' skinTonesDisabled='true' width='25rem' height='25rem'/>}</div>
    <div className='p-5 flex gap-10 w-full items-center'>
        <div className='text-purple-500 cursor-pointer transition ease-in-out duration-300 hover:text-white'>
            <BsFillEmojiSunglassesFill size={30} onClick={handleShowEmojiClick}/>
        </div>
        <form className='flex justify-between gap-10 w-full items-center' onSubmit={(e) => sendMsg(e)}>
            <input className='w-full rounded-md placeholder-slate-600 text-slate-900 py-1 px-2' value={msg} onChange={(e) => setMsg(e.target.value)} placeholder='type your message here...'/>
            <button type="submit" className='rounded-md bg-purple-500 p-2 text-black cursor-pointer transition ease-in-out duration-300 hover:text-white hover:bg-purple-600'><AiOutlineSend size={20} /></button>
        </form>
    </div>
    </div>
  )
}


export default ChatInput