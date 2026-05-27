const database = require('../database/config')

const create = (user, category, type) => {
  const command = `insert into item_category (user_id, category, item_type_id) value (${user}, '${category}', '${type}')`

  return database.execute(command)
}

const update = (user, id, category, type) => {
  const command = `update item_category set category = '${category}', item_type_id = '${type}', updated_at = current_timestamp where user_id = '${user}' and id = '${id}' and deleted_at is null`
  
  return database.execute(command)
}

const remove = (user, id) => {
  const command = `update item_category set deleted_at = current_timestamp where user_id = '${user}' and id = '${id}'`
  
  return database.execute(command)
}

const getAllByUser = (user) => {
  const command = `select c.id, c.category, t.item_type from item_category c join item_type t on c.item_type_id = t.id where c.user_id = ${user} and c.deleted_at is null`
  
  return database.execute(command)
}

const getLatestByUser = (user) => {
  const command = `select c.id, c.category, t.item_type from item_category c join item_type t on c.item_type_id = t.id where c.user_id = ${user} and c.deleted_at is null order by c.id desc limit 1`

  return database.execute(command)
}

module.exports = {
  create,
  update,
  remove,
  getAllByUser,
  getLatestByUser
}