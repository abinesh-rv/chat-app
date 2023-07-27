const Messages = require("../models/messageModels")

module.exports.addMessage =async (req,res) => {
    const {from,to,message} = req.body
    const data = await Messages.create({
        message : {text : message},
        users : [from,to],
        sender : from
    });
    if(!data){
        return res.sendStatus(444).json({msg : "error in adding message to database, please try again later"})
    }
}

module.exports.getAllMessage =async (req,res) => {
    const {from,to} = req.body
    const messages = await Messages.find({
    $and:[
    {"users._id" : from} ,{ "users._id" : to}
    ]
    })
    const projectMessages = messages.map((msg) => {
        return {
        fromSelf : msg.sender.toString() === from,  
        message : msg.message.text,
        }
    })
    return res.json(projectMessages)
}