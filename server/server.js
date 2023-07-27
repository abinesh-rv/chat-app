const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const messageRouter = require("./routes/messageRoutes")
const userRouter = require("./routes/userRoutes")


const app = express()
require("dotenv").config()

app.use(cors())
app.use(express.json())
app.use("/api/auth",userRouter)
app.use("/api/chat",messageRouter)


mongoose.connect(`${process.env.MONGO_URL}`,{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(() => {
    console.log("mongoDB connected")
}).catch((err) => {
    console.log(err.message)
})
 
const server = app.listen(process.env.PORT,() => {
    console.log("server connected to port " + process.env.PORT)
})

const io = require("socket.io")(server,{
    cors:{
     origin:["http://localhost:3000"],
     credentials : true
    }
 })

// const io = socket(server,{
//     cors :{
//         origin:"http://localhost:3000",
//         credentials : true
//     }
// })

global.onlineUsers = new Map()

io.on("connection",(socket) => {
    global.chatSocket = socket;
    socket.on("add-user",(Userid) => {
        onlineUsers.set(Userid,socket.id)
    })

    socket.on("send-msg",(data) => {
        const sendUserSocket = onlineUsers.get(data.to)
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("receive-msg",data.msg)
        }
    })
})

