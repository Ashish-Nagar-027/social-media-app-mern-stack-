const Conversation = require('../models/Conversations')

//create conversation
const createConversation = async (req,res) => {
     console.log('create conversation')
    
   
    try {
    const { id_1, id_2 } = req.body
   
    const members =  [id_1, id_2]
    const conversation = Conversation.create({members})
   
     res.status(200).json({message:'conversation created', conversation})
    } catch (error) {
        
    }
}
//get user conversation
const getConversation = async (req,res) => {
    console.log('get conversation')
}

module.exports = {
    createConversation,
    getConversation
}