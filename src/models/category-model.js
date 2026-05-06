const database = require('../database/config')

const create = (user, category) => {
  const command = `insert into item_category (user_id, category) value (${user}, '${category}')`

  return database.execute(command)
}

const update = (user, id, category) => {
  const command = `update item_category set category = '${category}', updated_at = current_timestamp where user_id = '${user}' and id = '${id}'`
  
  return database.execute(command)
}

const remove = (user, id) => {
  const command = `update item_category set deleted_at = current_timestamp where user_id = '${user}' and id = '${id}'`
  
  return database.execute(command)
}

const getAllByUser = (user) => {
  const command = `select id, category from item_category where user_id = ${user} and deleted_at is null`
  
  return database.execute(command)
}

module.exports = {
  create,
  update,
  remove,
  getAllByUser
}