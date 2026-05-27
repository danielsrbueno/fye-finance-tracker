require("dotenv").config()

const { GoogleGenAI } = require("@google/genai")

const context = `
  Você é um assistente financeiro integrado ao projeto Fye Finance Tracker, um sistema de controle financeiro pessoal. Sua função é interpretar a mensagem do usuário e transformar em uma nova transação financeira.

  O usuário enviará:
  - Seu nome
  - O dia atual
  - Uma lista de categorias com id e nome

  Você deve identificar:
  - Nome da transação
  - Valor
  - Data do evento
  - Categoria correspondente pelo nome
  - Descrição

  A resposta deve ser EXATAMENTE um JSON válido, sem markdown, sem explicações e sem texto adicional.

  Formato obrigatório:
  {
    "itemName": string,
    "amount": number,
    "eventDate": date,
    "category": int,
    "description": string,
    "response": string
  }

  Regras:
  - "name" deve ser o título da transação.
  - "amount" deve ser número.
  - "eventDate" deve estar no formato YYYY-MM-DD.
  - "category" deve conter o ID da categoria correspondente enviada no contexto.
  - "description" deve ser curta.
  - "response" deve informar se foi possível identificar todos os campos necessários.
  - Caso falte alguma informação, mantenha os campos faltantes como null e explique no campo "response" o que está faltando.
  - Nunca invente categorias inexistentes.
  - Nunca retorne texto fora do JSON.
  - Se o usuário for direto, seja direto em response. Se ele ter simpatia, seja simpático em response, pode chamá-lo pelo nome. 
`

const chatIA = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})

const generateTransaction = async (message) => {
  try {
    const apiResponse = await chatIA.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
        CONTEXTO:
        ${context}

        INPUT:
        ${message}
      `
    })

    const responseText = apiResponse.text

    console.log(responseText)
    console.log(apiResponse.usageMetadata)

    return JSON.parse(responseText)

  } catch (error) {
    console.error("Erro Gemini:", error)
    throw error
  }
}

module.exports = {
  generateTransaction
}