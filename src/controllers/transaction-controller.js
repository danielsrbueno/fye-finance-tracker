const transactionModel = require('../models/transaction-model')

const create = (req, res) => {
  const user = req.body.userId
  const name = req.body.transactionName
  const category = req.body.transactionCategoryId
  const type = req.body.transactionTypeId
  const amount = req.body.transactionAmount
  const date = req.body.transactionDate
  const description = req.body.transactionDescription

  if (!user)
    return res.status(400).json({ message: "Usuário está undefined!" })
  if (!name)
    return res.status(400).json({ message: "Nome da transação está undefined!" })
  if (!category)
    return res.status(400).json({ message: "Categoria da transação está undefined!" })
  if (!type)
    return res.status(400).json({ message: "Tipo da transação está undefined!" })
  if (!amount)
    return res.status(400).json({ message: "Valor da transação está undefined!" })
  if (!date)
    return res.status(400).json({ message: "Data da transação está undefined!" })

  transactionModel.create(user, name, category, type, amount, date, description)
  .then(result => res.status(201).send(result))
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "Algo deu errado. Tente novamente mais tarde."})
  })
}

const update = (req, res) => {
  const user = req.body.userId
  const id = req.body.transactionId
  const name = req.body.transactionName
  const category = req.body.transactionCategoryId
  const type = req.body.transactionTypeId
  const amount = req.body.transactionAmount
  const date = req.body.transactionDate
  const description = req.body.transactionDescription

  if (!user)
    return res.status(400).json({ message: "Id do usuário está undefined!" })
  if (!id)
    return res.status(400).json({ message: "Id da transação está undefined!" })
  if (!name)
    return res.status(400).json({ message: "Nome da transação está undefined!" })
  if (!category)
    return res.status(400).json({ message: "Categoria da transação está undefined!" })
  if (!type)
    return res.status(400).json({ message: "Tipo da transação está undefined!" })
  if (!amount)
    return res.status(400).json({ message: "Valor da transação está undefined!" })
  if (!date)
    return res.status(400).json({ message: "Data da transação está undefined!" })

  transactionModel.update(user, id, name, category, type, amount, date, description)
  .then(result => res.status(200).send(result))
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "Algo deu errado. Tente novamente mais tarde."})
  })
}

const remove = (req, res) => {
  const user = req.body.userId
  const id = req.body.transactionId

  if (!user)
    return res.status(400).json({ message: "Id do usuário está undefined!" })
  if (!id)
    return res.status(400).json({ message: "Id da transação está undefined!" })

  transactionModel.remove(user, id)
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

  transactionModel.getAllByUser(user)
  .then(result => {
    if (result.length === 0)
      return res.status(204)

    res.status(200).send(result)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "Algo deu errado. Tente novamente mais tarde."})
  })
}

const getHomeChartsData = async (req, res) => {
  const user = req.params.userId

  if (!user)
    return res.status(400).json({ message: "Id do usuário está undefined!" })

  // é preciso usar o try/catch para tratar erros, porém ainda não foi passado em nenhuma api ou pelo professor
  const totalByItemTypes = await transactionModel.getTotalByItemTypes(user)

  const income = await transactionModel.getTotalTypeByItemCategories(user, 1)
  const expense = await transactionModel.getTotalTypeByItemCategories(user, 2)
  const investment = await transactionModel.getTotalTypeByItemCategories(user, 3)

  const response = {
    totalByItemTypes,
    totalType: {
      income,
      expense,
      investment
    }
  }

  return res.status(200).send(response)
}

module.exports = {
  create,
  update,
  remove,
  getAllByUser,
  getHomeChartsData
}