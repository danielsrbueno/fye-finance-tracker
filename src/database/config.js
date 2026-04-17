
const mysql = require("mysql2")

const mySqlConfig = {
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
}

function databaseConection(command) {

  if (process.env.ENVIRONMENT !== "prod" && process.env.ENVIRONMENT !== "dev") {
    console.log("\nO ambiente (produção ou desenvolvimento) não foi definido em .env ou dev.env ou app.js\n")
    return Promise.reject("Ambiente não configurado em .env")
  }

  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mySqlConfig)
    connection.connect()
    connection.query(command, (erro, result) => {
      connection.end()
      if (erro) 
        reject(erro)
      
      console.log(result)
      resolve(result)
    })
    connection.on('error', error => {
      return ("Erro no MySQL Server: ", error.sqlMessage)
    })
  })
}

module.exports = {
  databaseConection
}