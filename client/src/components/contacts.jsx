import React,{useState} from "react"
import { BsChatRightDotsFill } from "react-icons/bs"


function Contacts({contacts,currentUser,changeChat}) {

    const [currentSelected,setCurrentSelected] = useState(undefined)

    const changeCurrentChat = (index,data) => {
     setCurrentSelected(index)
     changeChat(data)
    }
    
    return (
    <div className="h-[95vh] md:h-[85vh] rounded-l-md  flex flex-col justify-between bg-gray-800 ">
      <div className='flex items-center flex-wrap justify-center gap-2 md:text-3xl text-base uppercase p-4'>
          <BsChatRightDotsFill color="rgb(123, 7, 138)"/>
          <span className="">RVchat</span>
      </div>
      <div className=" py-3 px-3 overflow-y-scroll h-full justify-self-start contactContainer">
      {(contacts) ? 
      contacts.map((data,index) => {
        return(
        <div key={index} onClick={() => changeCurrentChat(index,data)} className={`flex flex-wrap gap-2 items-center cursor-pointer justify-center md:justify-start  bg-purple-800 py-3 my-3 px-1 rounded-md transition-all ease-in-out duration-300 ${(index === currentSelected) ? "border-2 md:ml-5 " : ""}`}>
           <img className="w-7 h-7 md:w-11 md:h-11"  src={`data:image/svg+xml;base64,${data.avatarImage}`} alt=""/>
           <div className="capitalize md:text-lg text-sm">{data.username}</div>
        </div>
        )
      }) : ""}
      </div>
      <div className="flex flex-wrap  justify-center items-center gap-5 my-3">
        <img className="md:w-16 md:h-16 w-10 h-10"  src={`data:image/svg+xml;base64,${currentUser.avatarImage}`} alt=""/>
        <div className="capitalize text-xl font-bold tracking-wide">{currentUser.username}</div>
      </div>
    </div>
  ) 
}

export default Contacts