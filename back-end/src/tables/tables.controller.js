const asyncErrorBoundary = require("../errors/asyncErrorBound")
const service = require("./tables.service")
function dataExists(req, res, next) {
    const { data } = req.body
    if (!data) {
        return next({
            status: 400,
            message: ""
        })
    }

    console.log('data')
    next()
}

function tableExists(req, res, next) {

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

async function create(req, res) {

    const table = await service.create(req.body.data)

    console.log('table', table, req.body.data)
    res.status(201).json({
        data: table
    })
}



module.exports = {
    create: [dataExists, tableExists, capacity, asyncErrorBoundary(create)]
}