const userModel = require('../models/user-model')

const login = (req, res) => {
  const email = req.body.userEmail
  const password = req.body.userPassword

  if (!email)
    return res.status(400).send("Seu email está undefined!")
  if (!password)
    return res.status(400).send("Sua senha está undefined!")

  userModel.login(email, password)
  .then(result => res.send(result))
  .catch(error => console.log("Algo deu errado: " + error))
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
  .catch(error => console.log("Algo deu errado: " + error))
}

module.exports = {
  login,
  register
}