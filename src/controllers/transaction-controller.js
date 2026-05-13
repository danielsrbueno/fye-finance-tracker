const transactionModel = require('../models/transaction-model')
const categoryModel = require('../models/category-model')

const create = (req, res) => {
  const user = req.body.userId
  const name = req.body.transactionName
  const category = req.body.transactionCategoryId
  const amount = req.body.transactionAmount
  const date = req.body.transactionDate
  const description = req.body.transactionDescription

  if (!user)
    return res.status(400).json({ message: "Usuário está undefined!" })
  if (!name)
    return res.status(400).json({ message: "Nome da transação está undefined!" })
  if (!category)
    return res.status(400).json({ message: "Categoria da transação está undefined!" })
  if (!amount)
    return res.status(400).json({ message: "Valor da transação está undefined!" })
  if (!date)
    return res.status(400).json({ message: "Data da transação está undefined!" })

  transactionModel.create(user, name, category, amount, date, description)
  .then(() => {
    transactionModel.getLatestByUser(user)
    .then(result => res.status(201).send(result))
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: "Algo deu errado. Tente novamente mais tarde."})
    })
  })
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
  if (!amount)
    return res.status(400).json({ message: "Valor da transação está undefined!" })
  if (!date)
    return res.status(400).json({ message: "Data da transação está undefined!" })

  transactionModel.update(user, id, name, category, amount, date, description)
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

const getAllByUser = async (req, res) => {
  const user = req.params.userId
  const { month, year } = req.query

  if (!user)
    return res.status(400).json({ message: "Id do usuário está undefined!" })
  if (!month)
    return res.status(400).json({ message: "Mês está undefined!" })
  if (!year)
    return res.status(400).json({ message: "Ano está undefined!" })

  const items = await transactionModel.getAllByUser(user, month, year)

  // if (items.length === 0)
  //   return res.status(204)
  console.log("chegou aq")
  const categories = await categoryModel.getAllByUser(user)

  const response = {
    items,
    categories
  }

  return res.status(200).send(response)
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