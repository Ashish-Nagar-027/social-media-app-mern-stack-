const { default: mongoose } = require("mongoose");
const Conversation = require("../models/Conversations");
const Message = require("../models/Message");

//create conversation
const createConversation = async (req, res) => {
  try {
    const { id_1, id_2 } = req.body;
    if (!id_1 || !id_2) {
      res.status().json({ message: "please send ids of both users" });
    }

    const members = [id_1, id_2];
    const conversation = await Conversation.create({ members });

    res.status(200).json({ message: "conversation created", conversation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get user conversation
const getConversation = async (req, res) => {
  try {

     if (!mongoose.isValidObjectId(req.params.userId)) {
        throw Error("please send valid id in url");
      }

    let conversation
     if (req.params.userId !== req.user.id){
       const userIds = [req.user.id, req.params.userId];
        conversation = await Conversation.find({
         members: { $all: userIds },
       });
     } 

      if (req.params.userId === req.user.id) {
       conversation = await Conversation.find({
      members: { $all: [req.user.id] },
    })}

     if (conversation.length === 0 && req.params.userId !== req.user.id) {
      const id_1 = req.user.id;
      const id_2 = req.params.userId;
     
      const members = [id_1, id_2];
      conversation = await Conversation.create({ members });
 
      return res
        .status(200)
        .json([conversation]);
    }

    return res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete user conversation
const deleteConversation = async (req, res) => {
  try {
    const id = req.params.userId;

    if (!mongoose.isValidObjectId(id)) {
      throw Error("please login ");
    }

    const deletedConversations = await Conversation.findByIdAndDelete(id);
    await Message.deleteMany({
      conversationId: id,
    });

    res
      .status(200)
      .json({ msg: "conversation deleted successful", deletedConversations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createConversation,
  getConversation,
  deleteConversation,
};
