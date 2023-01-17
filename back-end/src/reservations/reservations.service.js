const db = require("../db/connection")

async function create(reservation) {

    const [created] = await db("reservations").insert(reservation).returning("*")
    return created
}


module.exports = {
    create
}