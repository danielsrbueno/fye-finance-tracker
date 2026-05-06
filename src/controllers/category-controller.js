const categoryModel = require("../models/category-model")

const create = (req, res) => {
  const { userId, categoryName } = req.body

  if (!userId)
    return res.status(400).json({ message: "Id do usuário está undefined!" })
  if (!categoryName)
    return res.status(400).json({ message: "Nome da categoria está undefined!" })

  categoryModel.create(userId, categoryName)
  .then(result => res.status(201).send(result))
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "Algo deu errado. Tente novamente mais tarde."})
  })
}

const update = (req, res) => {
  const { userId, categoryId, categoryName } = req.body

  if (!userId)
    return res.status(400).json({ message: "Id do usuário está undefined!" })
  if (!categoryId)
    return res.status(400).json({ message: "Id da categoria está undefined!" })
  if (!categoryName)
    return res.status(400).json({ message: "Nome da categoria está undefined!" })

  categoryModel.update(userId, categoryId, categoryName)
  .then(result => res.status(200).send(result))
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "Algo deu errado. Tente novamente mais tarde."})
  })
}

const remove = (req, res) => {
  const { userId, categoryId } = req.body

  if (!userId)
    return res.status(400).json({ message: "Id do usuário está undefined!" })
  if (!categoryId)
    return res.status(400).json({ message: "Id da categoria está undefined!" })

  categoryModel.remove(userId, categoryId)
  .then(result => res.status(200).send(result))
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "Algo deu errado. Tente novamente mais tarde."})
  })
}

const getAllByUser = (req, res) => {
  const { userId } = req.body

  if (!userId)
    return res.status(400).json({ message: "Id do usuário está undefined!" })

  categoryModel.getAllByUser(userId)
  .then(result => res.status(200).send(result))
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