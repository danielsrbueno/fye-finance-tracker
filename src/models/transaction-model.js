const database = require('../database/config')

const create = (user, name, category, type, amount, date, description) => {
  const command = `insert into items (user_id, item_name, item_category_id, item_type_id, amount, event_date, item_description) values (${user}, '${name}', ${category}, ${type}, ${amount}, '${date}', '${description}')`

  return database.execute(command)
}

const update = (id, name, category, type, amount, date, description) => {
  const command = `update items set item_name = '${name}', item_category_id = ${category}, item_type_id = ${type}, amount = ${amount}, event_date = '${date}', item_description = '${description}', updated_at = current_timestamp where id = ${id}`

  return database.execute(command)
}

const remove = (id) => {
  const command = `update items set deleted_at = current_timestamp where id = ${id}`

  return database.execute(command)
}

const getAllByUser = (user) => {
  const command = ` select i.id, i.item_name, c.category, t.item_type, i.item_description, i.amount, i.event_date, i.created_at, i.updated_at from items i left join item_categories c on i.item_category_id = c.id left join item_types t on i.item_type_id = t.id where i.user_id = ${user} and deleted_at is null;`

  return database.execute(command)
}

module.exports = {
  create,
  update,
  remove,
  getAllByUser
}