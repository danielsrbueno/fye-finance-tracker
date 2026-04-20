const userModel = require('../models/user-model')

const login = (req, res) => {
  const email = req.body.userEmail
  const password = req.body.userPassword

  if (!email)
    return res.status(400).send("Seu email está undefined!")
  if (!password)
    return res.status(400).send("Sua senha está undefined!")

  userModel.login(email, password)
  .then(result => {
    if (result.length === 1)
      return res.send(result[0])
    return res.status(404).json({ message: "Login inválido. Verifique suas credenciais." })
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "Algo deu errado. Tente novamente mais tarde."})
  })
}

const register = (req, res) => {
  const username = req.body.userName
  const email = req.body.userEmail
  const password = req.body.userPassword

  if (!username)
    return res.status(400).send("Seu nome está undefined!")
  if (!email)
    return res.status(400).send("Seu email está undefined!")
  if (!password)
    return res.status(400).send("Sua senha está undefined!")

  userModel.register(username, email, password)
  .then(result => res.status(201).send(result))
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "Algo deu errado. Tente novamente mais tarde."})
  })
}

module.exports = {
  login,
  register
}