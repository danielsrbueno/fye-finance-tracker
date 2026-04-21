const financeModel = require('../models/finance-model')

const create = (req, res) => {
  const user = req.body.userId
  const name = req.body.financeName
  const category = req.body.financeCategoryId
  const type = req.body.financeTypeId
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

const update = (req, res) => {
  const id = req.body.financeId
  const name = req.body.financeName
  const category = req.body.financeCategoryId
  const type = req.body.financeTypeId
  const amount = req.body.financeAmount
  const date = req.body.financeDate
  const description = req.body.financeDescription

  if (!id)
    return res.status(400).json({ message: "Id da finança está undefined!" })
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

  financeModel.update(id, name, category, type, amount, date, description)
  .then(result => res.status(200).send(result))
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "Algo deu errado. Tente novamente mais tarde."})
  })
}

const remove = (req, res) => {
  const id = req.body.financeId

  if (!id)
    return res.status(400).json({ message: "Id da finança está undefined!" })

  financeModel.remove(id)
  .then(result => res.status(200).send(result))
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "Algo deu errado. Tente novamente mais tarde."})
  })
}

const getAllByUser = (req, res) => {
  const user = req.params.userId

  if (!user)
    return res.status(400).json({ message: "Id do usuário está undefined!" })

  financeModel.getAllByUser(user)
  .then(result => {
    if (result.length === 0)
      return res.status(204).json({ message: "Nenhuma transação encontrada."})

    res.status(200).send(result)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "Algo deu errado. Tente novamente mais tarde."})
  })
}

module.exports = {
  create,
  update,
  remove,
  getAllByUser
}