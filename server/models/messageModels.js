const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema({
     message : {
        text : {type:String,required:true}
     },
     users : Array,
     sender : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true
     }
},{timestamps:true})

const MessageModel = mongoose.model("Messages",MessageSchema)

module.exports = MessageModel;