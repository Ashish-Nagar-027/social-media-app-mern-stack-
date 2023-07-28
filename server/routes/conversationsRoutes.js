const express = require('express')
const verifyToken = require('../middlewares/verifyToken')
const { createConversation ,getConversation} = require('../controller/conversationsController')

const router = express.Router()


// create conversation
router.post('/', verifyToken, createConversation)

// get the conversation
router.get('/:userId', verifyToken, getConversation)


module.exports = router