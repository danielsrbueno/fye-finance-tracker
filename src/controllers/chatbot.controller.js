const chatbotModel = require("../models/chatbot.model")

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body

    if (!message) 
      return res.status(400).json({ message: "Mensagem obrigatória" })

    const response = await chatbotModel.generateTransaction(message)
    return res.json(response)
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: "Erro interno do servidor"
    })
  }
}

module.exports = {
  sendMessage
}