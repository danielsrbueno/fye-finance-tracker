const environment = 'dev'

const dotEnvPath = environment === 'prod' ? '.env' : '.env.dev'

require("dotenv").config({ path: dotEnvPath })

const express = require("express")
const cors = require("cors")
const path = require("path")
const APP_PORT = process.env.APP_PORT
const APP_HOST = process.env.APP_HOST

const app = express()
const indexRouter = require("./src/routes/index-route")
const userRouter = require("./src/routes/user-route")
const financeRouter = require("./src/routes/finance-route")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

app.use(cors())
app.use("/", indexRouter)
app.use("/user", userRouter)
app.use("/finance", financeRouter)

app.listen(APP_PORT, () => {
    console.log(`
    ##   ##  ######   #####             ####       ##     ######     ##              ##  ##    ####    ######  
    ##   ##  ##       ##  ##            ## ##     ####      ##      ####             ##  ##     ##         ##  
    ##   ##  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##        ##   
    ## # ##  ####     #####    ######   ##  ##   ######     ##     ######   ######   ##  ##     ##       ##    
    #######  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##      ##     
    ### ###  ##       ##  ##            ## ##    ##  ##     ##     ##  ##             ####      ##     ##      
    ##   ##  ######   #####             ####     ##  ##     ##     ##  ##              ##      ####    ######  
    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${APP_HOST}:${APP_PORT} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.ENVIRONMENT}:. \n\n`)
})
