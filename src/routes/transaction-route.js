const express = require('express')
const router = express.Router()

const transactionController = require('../controllers/transaction-controller')

router.post("/create", (req, res) => {
  transactionController.create(req, res)
})

router.put("/update", (req, res) => {
  transactionController.update(req, res)
})

router.delete("/remove", (req, res) => {
  transactionController.remove(req, res)
})

router.get('/:userId', (req, res) => {
  transactionController.getHomeChartsData(req, res)
})

module.exports = router