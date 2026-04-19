const database = require("../database/config")

const authentication = (email, password) => {
  const command = `select id, user_name, email from users where email='${email}' and passwd='${password}'`

  return database.execute(command)
}

const register = (username, email, password) => {
  const command = `insert into users (user_name, email, passwd) values ('${username}', '${email}', '${password}')`

  return database.execute(command)
}

module.exports = {
  authentication,
  register
}