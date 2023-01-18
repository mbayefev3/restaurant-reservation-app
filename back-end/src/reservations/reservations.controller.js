/**
 * List handler for reservation resources
 */
const service = require("./reservations.service")
const moment = require("moment")

const asyncErrorBoundary = require("../errors/asyncErrorBound")
async function list(req, res) {

  const { date: defaultDate, reservationDate } = req.query

  const searchByDate = defaultDate || reservationDate
  const reservations = await service.list(searchByDate)
  res.json({
    data: reservations,
  });
}

function dataExists(req, res, next) {

  const { data } = req.body
  if (!data) {
    return next({
      status: 400,
      message: "data  is missing"

    })
  }

  next()
}

function FirstNameExists(req, res, next) {
  const { data: { first_name } = {} } = req.body
  if (!first_name) {
    return next({
      status: 400,
      message: "first_name is missing"
    })

  }

  next()

}

function lastNameExists(req, res, next) {
  const { data: { last_name } = {} } = req.body

  if (!last_name) {
    return next({
      status: 400,
      message: "last_name  is missing"
    })
  }
  next()
}

function mobilePhoneExists(req, res, next) {
  const { data: { mobile_number } = {} } = req.body
  if (!mobile_number) {
    return next({
      status: 400,
      message: "mobile_number is missing"
    })
  }
  next()
}

function reservationDateExists(req, res, next) {
  const { data: { reservation_date } = {} } = req.body

  const isDateValid = moment(reservation_date, "YYYY-MM-DD", true).isValid(); // this will check if the date is in valid format

  if (!reservation_date) {

    return next({
      status: 400,
      message: "reservation_date is missing"
    })
  }
  if (!isDateValid) {

    return next({
      status: 400,
      message: "is not a valid reservation_date"
    })
  }
  next()

}

function reservationTimeExists(req, res, next) {

  // 17:30
  const { data: { reservation_time } = {} } = req.body
  const isTimeValid = moment(reservation_time, 'hh:mm').isValid() // this will check if the time is in valid format

  console.log('is', isTimeValid, reservation_time)
  if (!reservation_time) {
    return next({
      status: 400,
      message: "reservation_time is missing"
    })
  }

  if (!isTimeValid) {
    return next({
      status: 400,
      message: "it is not a valid reservation_time"
    })

  }
  next()
}


function peopleExists(req, res, next) {

  const { data: { people } = {} } = req.body

  // console.log('people', people)
  if (!people || !Number.isInteger(people)) {
    return next({
      status: 400,
      message: "people is missing"
    })
  }
  next()

}

async function create(req, res) {

  console.log('adsadasdsad', req.body.data)
  req.body.data.people = Number(req.body.data.people)

  // console.log('datadd', req.body.data.people)
  const reservation = await service.create({
    ...req.body.data

  })

  // console.log('res', reservation)

  res.status(201).json({
    data: reservation
  })

}



module.exports = {
  list: asyncErrorBoundary(list),
  create: [dataExists, FirstNameExists, lastNameExists, mobilePhoneExists, reservationDateExists, reservationTimeExists, peopleExists, asyncErrorBoundary(create)]
};
