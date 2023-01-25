const knex = require("../db/connection")

async function create(table) {

    const [created] = await knex("tables").insert(table).returning("*")
    return created
}


async function list() {
    return knex("tables").select("*").orderBy('table_name', 'asc')

}

async function readReservation(reservation_id) {

    const reservation = await knex("reservations").select("*").where({ reservation_id })

    return reservation

}

async function readTable(table_id) {

    const table = await knex("tables").select("*").where({ table_id })
    return table
}

async function update(reservation_id, table_id) {
    const updated = await knex("tables").update({ reservation_id }).where({ table_id }).returning("*")

    return updated
}
module.exports = {
    create,
    list,
    readReservation,
    readTable,
    update

}