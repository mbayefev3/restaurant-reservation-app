const knex = require("../db/connection")
const db = require("../db/connection")

async function create(reservation) {

    const [created] = await db("reservations").insert(reservation).returning("*")
    return created
}



async function read(reservation_id) {


    // knex('users').where(function() {
    //     this.where('id', 1).orWhere('id', '>', 10)
    //   }).orWhere({name: 'Tester'})




    const reservation = await db("reservations").select("*").where({ reservation_id }).first()



    console.log("Reeeeeeeeeeeeeeeeeeeeeeeeee", reservation)


    return reservation
}

async function list(date) {
    console.log('reservationfsdfsf', date)


    const reservations = await db("reservations").select("*").where({ reservation_date: date }).orderBy('reservation_time', 'asc')


    return reservations
}


async function finishExists(reservation_id) {

    const { status } = await db("reservations").select("*").where({ reservation_id }).first()

    return status

}

async function updateReservationStatus(status, reservation_id) {

    const reservation = await db("reservations").update({ status }).where({ reservation_id })
    const reservations = await db("reservations").select("*")

    return reservations

}

module.exports = {
    create,
    list,
    read,
    update: updateReservationStatus,
    finishExists
}