const express = require("express")
const router = express.Router()

const userController = require("../controllers/user-controller")

router.post("/register", (req, res) => {
  userController.register(req, res)
})

router.post("/authentication", (req, res) => {
  userController.authentication(req, res)
})

module.exports = router