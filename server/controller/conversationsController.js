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
        res.status(500).json({ message: error.message });
    }
}
//get user conversation
const getConversation = async (req,res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] }
        })
        res.status(200).json(conversation)
    } catch (error) {
          res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createConversation,
    getConversation
}