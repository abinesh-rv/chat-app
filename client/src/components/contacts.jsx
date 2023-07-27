import React,{useState} from "react"
import { BsChatRightDotsFill } from "react-icons/bs"


function Contacts({contacts,currentUser,changeChat}) {

    const [currentSelected,setCurrentSelected] = useState(undefined)

    const changeCurrentChat = (index,data) => {
     setCurrentSelected(index)
     changeChat(data)
    }
    
    return (
    <div className="h-[85vh] rounded-l-md  flex flex-col justify-between bg-gray-800 ">
      <div className='flex items-center justify-center gap-2 text-3xl uppercase p-4'>
          <BsChatRightDotsFill color="rgb(123, 7, 138)"/>
          <span>RVchat</span>
      </div>
      <div className=" py-3 px-3 overflow-y-scroll h-full justify-self-start contactContainer">
      {(contacts) ? 
      contacts.map((data,index) => {
        return(
        <div key={index} onClick={() => changeCurrentChat(index,data)} className={`flex gap-2 items-center cursor-pointer bg-purple-800 py-3 my-3 px-1 rounded-md transition-all ease-in-out duration-300 ${(index === currentSelected) ? "border-2 ml-5 " : ""}`}>
           <img className="w-11 h-11"  src={`data:image/svg+xml;base64,${data.avatarImage}`} alt=""/>
           <div className="capitalize text-lg">{data.username}</div>
        </div>
        )
      }) : ""}
      </div>
      <div className="flex  justify-center items-center gap-5 my-3">
        <img className="w-16 h-16"  src={`data:image/svg+xml;base64,${currentUser.avatarImage}`} alt=""/>
        <div className="capitalize text-xl font-bold tracking-wide">{currentUser.username}</div>
      </div>
    </div>
  ) 
}

export default Contacts