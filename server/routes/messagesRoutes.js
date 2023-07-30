const express = require('express')
const { addMessage, getMessages } = require('../controller/messagesController')
const router = express.Router()


// add message
router.post('/' , addMessage)

// get messages
router.get('/:conversationId' , getMessages)


module.exports = router