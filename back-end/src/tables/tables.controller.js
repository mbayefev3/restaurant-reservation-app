const asyncErrorBoundary = require("../errors/asyncErrorBound")
const service = require("./tables.service")

function dataExists(req, res, next) {
    const { data } = req.body
    if (!data) {
        return next({
            status: 400
        })
    }
    console.log('ggggg')
    next()
}


function reservationIdExists(req, res, next) {

    const { data: { reservation_id } = {} } = req.body

    if (reservation_id) {
        return next()
    }
    next({
        status: 400,
        message: "reservation_id does not exist"
    })

}

async function reservationExists(req, res, next) {

    const { data: { reservation_id } = {} } = req.body

    const reservation = await service.readReservation(Number(reservation_id))
    // console.log('reee', reservation)
    if (reservation.length === 0) {
        return next({
            status: 404,
            message: `no reservation was found for ${reservation_id}`
        })
    }
    next()

}


async function sufficientCapacity(req, res, next) {
    const { data: { reservation_id } = {} } = req.body

    const { table_id } = req.params

    const [{ capacity }] = await service.readTable(Number(table_id))
    const [{ people }] = await service.readReservation(Number(reservation_id))
    if (people <= capacity) {
        return next()
    }
    next({
        status: 400,
        message: "there is not enough capacity"
    })

}

async function tableOccupied(req, res, next) {

    // const { data: { reservation_id } = {} } = req.body

    const { table_id } = req.params

    const [{ reservation_id }] = await service.readTable(Number(table_id))
    if (reservation_id) {
        next({
            status: 400,
            message: "the table is occupied, there is not a seat"
        })
    }

    next()
    // const [{ people }] = await service.readReservation(Number(reservation_id))

}




function tableNameExists(req, res, next) {

    const { data: { table_name } = {} } = req.body

    if (!table_name) {
        return next({
            status: 400,
            message: "there must be a table_name"
        })
    } else if (table_name.trim().length < 2) {

        return next({
            status: 400,
            message: "the table_name must be at least two characters long"
        })
    }
    next()
}

function capacity(req, res, next) {
    const { data: { capacity } = {} } = req.body

    if (!capacity) {
        return next({
            status: 400,
            message: "there must be at least 1 capacity"
        })
    } else if (!Number.isInteger(capacity)) {

        return next({
            status: 400,
            message: "capacity must be a number greater than or equal to 1"
        })
    }


    next()

}










async function list(req, res) {

    const tables = await service.list()

    res.status(200).json({
        data: tables
    })

}

async function create(req, res) {

    const table = await service.create(req.body.data)

    console.log('table', table, req.body.data)
    res.status(201).json({
        data: table
    })
}



async function seatedExists(req, res, next) {

    const [{ status }] = await service.readReservation(Number(req.body.data.reservation_id))

    if (status === "seated") {
        return next({
            status: 400,
            message: `the table is seated`
        })
    }
    next()
}


async function changeStatusSeated(req, res, next) {

    // const { data: { reservation_id } = {} } = req.body
    // const { table_id } = req.params

    await service.changeTableStatus(Number(req.params.table_id), "seated")
    next()

}



async function update(req, res) {
    const { data: { reservation_id } = {} } = req.body
    const { table_id } = req.params
    const updated = await service.update(reservation_id, table_id)


    console.log("updateddd", updated)

    res.status(200).json({
        data: updated
    })

}




async function tableExists(req, res, next) {

    const { table_id } = req.params

    const table = await service.readTable(table_id)

    if (table.length) {
        return next()
    }
    next({
        status: 404,
        message: `The table ${table_id} is no existent`
    })

}


async function isTableOccupied(req, res, next) {
    const { table_id } = req.params

    const [{ reservation_id }] = await service.readTable(Number(table_id))

    if (!reservation_id) {
        return next({
            status: 400,
            message: `the table ${table_id} is not occupied`
        })
    }
    else if (reservation_id) {
        const tables = await service.removeTableFromReservation(Number(table_id))
        res.json({
            data: tables
        })
    }



}


async function changeStatus(req, res, next) {
    const status = await service.changeTableStatus(Number(req.params.table_id), "finished")

    // console.log("stau", status)
    // res.locals.status = status
    next()
}






async function seated(req, res, next) {
    const { data: { reservation_id } = {} } = req.body
    await service.seated(Number(reservation_id))
    next()
}


module.exports = {
    create: [dataExists, tableNameExists, capacity, asyncErrorBoundary(create)],
    list: asyncErrorBoundary(list),
    update: [dataExists, reservationIdExists, asyncErrorBoundary(reservationExists), asyncErrorBoundary(sufficientCapacity)
        , asyncErrorBoundary(tableOccupied), asyncErrorBoundary(seatedExists), asyncErrorBoundary(seated), update],
    delete: [asyncErrorBoundary(tableExists), asyncErrorBoundary(changeStatus), asyncErrorBoundary(isTableOccupied)
    ]
}