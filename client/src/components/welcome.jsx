import React from 'react'
import Robot from "../assets/robot.gif"
import Logout from './Logout'

function Welcome({currentUser}) {
  return (
    <div className='relative h-full'>
      <Logout/>
    <div className=' p-3 flex flex-col h-full justify-center items-center'>
        <img className='h-[25rem] w-[25rem]' src={Robot}/>
        <div>
            <h1 className='text-2xl font-bold tracking-widest text-center'>Welcome,<span className='text-purple-600'>{currentUser.username}!</span></h1>
            <h5 className='font-semibold'>Please select a chat to Start Messaging</h5>
        </div>
    </div>
    </div>
  )
}

export default Welcome