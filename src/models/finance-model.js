const database = require('../database/config')

const create = (user, name, category, type, amount, date, description) => {
  const command = `insert into items (user_id, item_name, item_category_id, item_type_id, amount, event_date, item_description) values (${user}, '${name}', ${category}, ${type}, ${amount}, '${date}', '${description}')`

  return database.execute(command)
}

const update = (id, name, category, type, amount, date, description) => {
  const command = `update items set item_name = '${name}', item_category_id = ${category}, item_type_id = ${type}, amount = ${amount}, event_date = '${date}', item_description = '${description}', updated_at = current_timestamp where id = ${id}`

  return database.execute(command)
}

module.exports = {
  create,
  update
}