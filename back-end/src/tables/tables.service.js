const knex = require("../db/connection")
const db = require("../db/connection")

async function create(table) {

    const [created] = await knex("tables").insert(table).returning("*")
    return created
}


module.exports = {
    create
}