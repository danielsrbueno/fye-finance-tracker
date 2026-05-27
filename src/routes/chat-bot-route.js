const express = require('express')
const router = express.Router()

const chatBotController = require("../controllers/chat-bot-controller")

router.post("/send-message", (req, res) => {
  chatBotController.sendMessage(req, res)
})

module.exports = router