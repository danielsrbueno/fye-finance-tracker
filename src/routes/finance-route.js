const express = require('express')
const router = express.Router()

const financeController = require('../controllers/finance-controller')

router.post("/create", (req, res) => {
  financeController.create(req, res)
})

router.post("/update", (req, res) => {
  financeController.update(req, res)
})

router.delete("/remove", (req, res) => {
  financeController.remove(req, res)
})

module.exports = router