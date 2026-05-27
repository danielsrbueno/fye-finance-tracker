const database = require("../database/config")

const login = (email, password) => {
  const command = `select id, user_name, email from user where email='${email}' and passwd=sha2('${password}', 256) and deleted_at is null`

  return database.execute(command)
}

const register = (username, email, password) => {
  const command = `insert into user (user_name, email, passwd) values ('${username}', '${email}', sha2('${password}', 256))`

  return database.execute(command)
}

module.exports = {
  login,
  register
}