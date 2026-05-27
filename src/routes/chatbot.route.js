const express = require('express')
const router = express.Router()

const chatbotController = require("../controllers/chatBot.controller")

router.post("/send-message", (req, res) => {
  chatbotController.sendMessage(req, res)
})

module.exports = router