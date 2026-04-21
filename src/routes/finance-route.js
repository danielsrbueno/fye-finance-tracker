const express = require('express')
const router = express.Router()

const financeController = require('../controllers/finance-controller')

router.post("/create", (req, res) => {
  financeController.create(req, res)
})

module.exports = router