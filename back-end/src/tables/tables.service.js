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



async function removeTableFromReservation(table_id) {

    const updated = await knex("tables").update({ reservation_id: null }).where({ table_id }).returning("*")

    const tables = await knex("tables").select("*").orderBy('table_name', 'asc')


    // console.log('ta', tables)
    return tables
}



// async function changeStatus(table_id) {


//     try {
//         await knex.transaction(async trx => {


//             const [{ reservation_id }] = await knex('tables as t').join("reservations as r", "t.reservation_id", "r.reservation_id").where({ "t.table_id": table_id }).select("r.reservation_id")


//             const updated = await trx("reservations").update({ status: "seated" }).where({ reservation_id }).returning("*")


//             // console.log("updateddddd", updated)
//             return updated
//         })
//     } catch (error) {
//         // If we get here, that means that neither the 'Old Books' catalogues insert,
//         // nor any of the books inserts will have taken place.
//         // return []
//         console.error(error);
//     }
// }




async function changeTableStatus(table_id, status) {




    try {
        await knex.transaction(async trx => {


            const [{ reservation_id }] = await knex('tables as t').join("reservations as r", "t.reservation_id", "r.reservation_id").where({ "t.table_id": table_id }).select("r.reservation_id")


            const updated = await trx("reservations").update({ status }).where({ reservation_id }).returning("*")


            // console.log("updateddddd", updated)
            return updated
        })
    } catch (error) {
        // If we get here, that means that neither the 'Old Books' catalogues insert,
        // nor any of the books inserts will have taken place.
        // return []
        console.error(error);
    }

}


async function seated(reservation_id) {
    const answer = await knex("reservations").update({ status: "seated" }).where({ reservation_id }).returning("*")

    console.log("asdsadasdasdsadddddddddd", answer)
    return answer

}




module.exports = {
    create,
    list,
    readReservation,
    readTable,
    update,
    removeTableFromReservation,
    changeTableStatus,
    seated
    // changeStatus

}