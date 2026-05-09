const express = require('express')
const router = express.Router()

const categoryController = require("../controllers/category-controller")

router.post("/create", (req, res) => {
  categoryController.create(req, res)
})

router.put("/update", (req, res) => {
  categoryController.update(req, res)
})

router.delete("/remove", (req, res) => {
  categoryController.remove(req, res)
})

router.get("/all", (req, res) => {
  categoryController.getAllByUser(req, res)
})

module.exports = router
