const { default: mongoose } = require('mongoose')
const Message = require('../models/Message')


// add new message to db 
const addMessage = async (req, res) => {
   
      const {conversationId, sender, text} = req.body

       try {
    if(!conversationId || !sender || !text) {
        throw Error('please send conversationId , sender and , text ')
    }
    const msg = {conversationId, sender, text}
 const addedMessage =  await  Message.create(msg)
 res.status(200).json({msg: addedMessage})
     } catch (error) {
    res.status(500).json({msg: error.message})
} }


// get all messages
const getMessages = async (req, res) => {

    try {
        if(!req.params.conversationId || !mongoose.isValidObjectId(req.params.conversationId)){
         throw Error("please send valid conversationId id to get post");
        }

        const messages = await Message.find({
            conversationId: req.params.conversationId
        })
        
     
       res.status(200).json(messages)
    } catch (error) {
          res.status(500).json({msg: error.message})
    }

}


module.exports = {
    addMessage,getMessages
}