const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{type:String,unique:true},
    email:{type:String,unique:true},
    password:{type:String},
    isAvatarSet:{type:Boolean,default:false},
    avatarImage:{type:String,default:false},
},{timestamps:true})

const userModel = new mongoose.model("Users",userSchema)

module.exports = userModel