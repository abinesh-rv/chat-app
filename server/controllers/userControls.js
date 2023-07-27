const User = require("../models/userModels.js")
const bcrypt = require("bcrypt")

module.exports.Register = async (req,res,next) => {
    const {username,email,password} = req.body
    const checkUser =await User.findOne({username});
    if(checkUser){
        return res.json({msg : "username already used",status:false})
    }
    const checkEmail =await User.findOne({email});
    if(checkEmail){
        return res.json({msg : "email already used",status:false})
    }

    const checkValidEmail = await fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=b996863f772847019eaa32ce9c9a4d93&email=${email}`)
    const {deliverability} =await checkValidEmail.json()
    if(deliverability !== "DELIVERABLE"){   
        return res.json({msg : "the email entered is not a valid one",status:false})
    }

    const hashpass =await bcrypt.hash(password,10)
    const user = await User.create({
      username,
      password:hashpass,
      email
    })
    await user.save() 
    return res.json({user:user,status:true})
}

module.exports.Login = async (req,res,next) => {
    const {username,password} = req.body
    const checkUser =await User.findOne({username})
    if(!checkUser){
        return res.json({msg : "invalid username",status:false})
    }
    const checkPass = await bcrypt.compare(password,checkUser.password);
    if(!checkPass){
        return res.json({msg : "please enter the correct password",status:false})
    }
    return res.json({user:checkUser,status:true})
}

module.exports.setAvatar = async (req,res) => {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    await User.updateOne({_id:userId},{$set : {
        isAvatarSet:true,
        avatarImage:avatarImage
    }})
    const userData = await User.findOne({_id:userId})
    return res.json({avatarImage:userData.avatarImage})
}

module.exports.getAllUsers = async (req,res) => {
    const userId = req.params.id;
    const users = await User.find({_id:{$ne : userId}}).select(["email","username","_id","avatarImage"])
    return res.json({users:users})
}