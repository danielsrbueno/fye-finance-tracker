const database = require('../database/config')

const create = (user, name, category, amount, date, description) => {
  const command = `insert into item (user_id, item_name, item_category_id, amount, event_date, item_description) values (${user}, '${name}', ${category}, ${amount}, '${date}', '${description}')`

  return database.execute(command)
}

const update = (user, id, name, category, amount, date, description, recurring) => {
  const command = `update item set item_name = '${name}', item_category_id = ${category}, amount = ${amount}, event_date = '${date}', item_description = '${description}', is_recurring = ${recurring}, updated_at = current_timestamp where id = ${id} and user_id = ${user} and deleted_at is null`

  return database.execute(command)
}

const remove = (user, id) => {
  const command = `update item set deleted_at = current_timestamp where id = ${id} and user_id = ${user} and deleted_at is null`

  return database.execute(command)
}

const getAllByUser = (user, month, year) => {
  const command = `select i.id, i.item_name, c.category, i.item_description, i.amount, i.event_date, i.is_recurring from item i left join item_category c on i.item_category_id = c.id left join item_type t on c.item_type_id = t.id where i.user_id = ${user} and i.event_date like '${year}-${month}-%' and i.deleted_at is null and c.deleted_at is null order by i.event_date`

  return database.execute(command)
}

const getTotalByItemTypes = (user, type, month, year) => {
  const command = `select sum(i.amount) amount_total from item i join item_category c on i.item_category_id = c.id join item_type t on c.item_type_id = t.id where i.user_id = ${user} and t.id = ${type} and i.event_date like '${year}-${month}-%' and i.deleted_at is null and c.deleted_at is null group by t.id`

  return database.execute(command)
}

const getTotalTypeByItemCategories = (user, type, month, year) => {
  const command = `select sum(i.amount) amount_total, c.category from item i join item_category c on i.item_category_id = c.id join item_type t on c.item_type_id = t.id where i.user_id = ${user} and t.id = ${type} and i.event_date like '${year}-${month}-%' and i.deleted_at is null and c.deleted_at is null group by c.category`

  return database.execute(command)
}

const getMoviment = (user, month, year) => {
  const command = `
    select sum(
      case
        when c.item_type_id = 1 then i.amount
        else i.amount * -1
        end
    ) as total,
    right(i.event_date, 2) as event_day
    from item i 
    join item_category c on i.item_category_id = c.id
    where i.user_id = '${user}' and c.user_id = '${user}' and c.item_type_id in (1,2) and i.event_date like '${year}-${month}-%' and i.deleted_at is null and c.deleted_at is null
    group by event_day;
  `

  return database.execute(command)
}

const getLatestByUser = (user) => {
  const command = `select i.id, i.item_name, c.category, i.item_description, i.amount, i.event_date from item i left join item_category c on i.item_category_id = c.id left join item_type t on c.item_type_id = t.id where i.user_id = ${user} and i.deleted_at is null and c.deleted_at is null order by i.id desc limit 1`

  return database.execute(command)
}

const createRecurringTransactions = (user, month, year) => {
  const command = `
    insert into item (user_id, item_name, item_category_id, item_description, is_recurring, parent_item, amount, event_date) 
    (select i.user_id, i.item_name, i.item_category_id, i.item_description, i.is_recurring, i.id, i.amount, 
    case 
      when day(i.event_date) > day(last_day('${year}-${month}-01')) then 
        last_day('${year}-${month}-01')
      else 
        concat('${year}-${month}-', day(i.event_date))
    end as event_date
    from item i 
    join user u on i.user_id = u.id
    where u.id = ${user} and i.is_recurring = 1 and i.parent_item is null and i.deleted_at is null)
  `

  return database.execute(command)
}

module.exports = {
  create,
  update,
  remove,
  getAllByUser,
  getTotalByItemTypes,
  getTotalTypeByItemCategories,
  getLatestByUser,
  getMoviment,
  createRecurringTransactions
}