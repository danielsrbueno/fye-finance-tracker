const express = require('express')
const router = express.Router()

const categoryController = require("../controllers/category-controller")

router.post("/", (req, res) => {
  categoryController.create(req, res)
})

router.put("/", (req, res) => {
  categoryController.update(req, res)
})

router.delete("/", (req, res) => {
  categoryController.remove(req, res)
})

router.get("/", (req, res) => {
  categoryController.getAllByUser(req, res)
})

module.exports = router
