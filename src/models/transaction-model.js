const database = require('../database/config')

const create = (user, name, category, type, amount, date, description) => {
  const command = `insert into item (user_id, item_name, item_category_id, item_type_id, amount, event_date, item_description) values (${user}, '${name}', ${category}, ${type}, ${amount}, '${date}', '${description}')`

  return database.execute(command)
}

const update = (user, id, name, category, type, amount, date, description) => {
  const command = `update item set item_name = '${name}', item_category_id = ${category}, item_type_id = ${type}, amount = ${amount}, event_date = '${date}', item_description = '${description}', updated_at = current_timestamp where id = ${id} and user_id = ${user} and deleted_at is null`

  return database.execute(command)
}

const remove = (user, id) => {
  const command = `update item set deleted_at = current_timestamp where id = ${id} and user_id = ${user} and deleted_at is null`

  return database.execute(command)
}

const getAllByUser = (user) => {
  const command = `select i.id, i.item_name, c.category, t.item_type, i.item_description, i.amount, i.event_date from item i left join item_category c on i.item_category_id = c.id left join item_type t on i.item_type_id = t.id where i.user_id = ${user} and i.deleted_at is null and c.deleted_at is null order by i.event_date`

  return database.execute(command)
}

const getTotalByItemTypes = (user) => {
  const command = `select sum(i.amount) amount_total, t.item_type from item i join item_category c on i.item_category_id = c.id join item_type t on i.item_type_id = t.id where i.user_id = ${user} and i.deleted_at is null and c.deleted_at is null group by t.id`

  return database.execute(command)
}

const getTotalTypeByItemCategories = (user, type) => {
  const command = `select sum(i.amount) amount_total, c.category from item i join item_category c on i.item_category_id = c.id join item_type t on i.item_type_id = t.id where i.user_id = ${user} and t.id = ${type} and i.deleted_at is null and c.deleted_at is null group by c.category`

  return database.execute(command)
}

module.exports = {
  create,
  update,
  remove,
  getAllByUser,
  getTotalByItemTypes,
  getTotalTypeByItemCategories
}