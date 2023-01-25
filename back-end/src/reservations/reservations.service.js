const db = require("../db/connection")

async function create(reservation) {

    const [created] = await db("reservations").insert(reservation).returning("*")
    return created
}



async function read(reservation_id) {

    const reservation = await db("reservations").select("*").where({ reservation_id }).first()
    return reservation
}

async function list(date) {
    console.log('reservationfsdfsf', date)


    const reservations = await db("reservations").select("*").where({ reservation_date: date }).orderBy('reservation_time', 'asc')


    return reservations
}
module.exports = {
    create,
    list,
    read
}