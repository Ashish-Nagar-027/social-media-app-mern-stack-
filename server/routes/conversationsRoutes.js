const express = require('express')
const verifyToken = require('../middlewares/verifyToken')
const { createConversation ,getConversation, deleteConversation} = require('../controller/conversationsController')

const router = express.Router()


// create conversation
router.post('/', verifyToken, createConversation)

// get the conversation
router.get('/:userId', verifyToken, getConversation)

// delete the conversation
router.delete('/:userId', verifyToken, deleteConversation)


module.exports = router