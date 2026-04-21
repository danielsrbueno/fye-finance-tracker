const financeModel = require('../models/finance-model')

const create = (req, res) => {
  const user = req.body.userId
  const name = req.body.financeName
  const category = req.body.financeCategory
  const type = req.body.financeType
  const amount = req.body.financeAmount
  const date = req.body.financeDate
  const description = req.body.financeDescription

  if (!user)
    return res.status(400).json({ message: "Usuário está undefined!" })
  if (!name)
    return res.status(400).json({ message: "Nome da finança está undefined!" })
  if (!category)
    return res.status(400).json({ message: "Categoria da finança está undefined!" })
  if (!type)
    return res.status(400).json({ message: "Tipo da finança está undefined!" })
  if (!amount)
    return res.status(400).json({ message: "Valor da finança está undefined!" })
  if (!date)
    return res.status(400).json({ message: "Data da finança está undefined!" })

  financeModel.create(user, name, category, type, amount, date, description)
  .then(result => res.status(201).send(result))
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "Algo deu errado. Tente novamente mais tarde."})
  })
}

module.exports = {
  create
}