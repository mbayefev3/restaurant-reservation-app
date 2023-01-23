/**
 * List handler for reservation resources
 */
const service = require("./reservations.service")
const moment = require("moment")
const convertPhoneNumberWithDash = require("../utils/convertPhoneNumber")
const asyncErrorBoundary = require("../errors/asyncErrorBound")
async function list(req, res) {

  const { date: defaultDate, reservationDate } = req.query

  const searchByDate = defaultDate || reservationDate
  const reservations = await service.list(searchByDate)

  res.json({
    data: reservations,
  });
}


// function validTimes(req, res, next) {

//   const { data: { reservation_time } = {} } = req.body

//   const openTime = moment("10:30", "HH:mm")
//   const beforeClosedTime = moment("21:30", "HH:mm")
//   const reservationTime = moment(reservation_time, "HH:mm")

//   const reservedBeforeOpen = reservationTime.isBefore(openTime)
//   const reservedWhenOpen = reservationTime.isAfter(beforeClosedTime)
//   const validReservationTime = reservationTime.isBetween(openTime, beforeClosedTime)

//   if (!validReservationTime) {
//     return next({
//       status: 400,
//       message: "please choose a different time between 10H31am to 9:29pm"
//     })

//     next()
//   }



// }
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


function validDays(req, res, next) {

  const { data: { reservation_date } = {} } = req.body
  const date = moment(reservation_date, "YYYY-MM-DD").format('dddd')
  const todayDate = moment(reservation_date, "YYYY-MM-DD").isBefore(moment().format("YYYY-MM-DD"))

  if (date === "Tuesday") {
    return next({
      status: 400,
      message: "The reservation date is a Tuesday as the restaurant is closed on Tuesdays."
    })
  }

  if (todayDate) {
    return next({
      status: 400,
      message: "The reservation date is in the past. Only future reservations are allowed."
    })
  }

  next()
  // The /reservations API will have the same validations as above and will return 400,
  //  along with an informative error message, when a validation error happens.

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

  if (mobile_number.length === 10 && !mobile_number.includes("-")) {

    return next()
  }

  if (mobile_number.length < 10) {
    return next({
      status: 400,
      message: "wrong mobile number format"
    })
  }
  if (mobile_number.includes("-") && mobile_number.length !== 12) {
    return next({
      status: 400,
      message: "wrong mobile number format"
    })
  }

  if (mobile_number.includes("-") && mobile_number.length === 12) {
    return next()
  }

  next({
    status: 400,
    message: "please check the entered mobile number"
  })
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
  console.log('peopleString', typeof people)

  if (people && typeof people === "string") {
    return next({
      status: 400,
      message: "people is string"
    })
  }

  if (!people) {
    return next({
      status: 400,
      message: "people is missing"
    })
  }

  next()

}



function validTimes(req, res, next) {

  const { data: { reservation_time } = {} } = req.body



  const openTime = moment("10:30", "HH:mm")
  const beforeClosedTime = moment("21:30", "HH:mm")
  const reservationTime = moment(reservation_time, "HH:mm") //24h




  const validReservationTime = reservationTime.isBetween(openTime, beforeClosedTime)

  if (validReservationTime) {
    return next()
  }


  next({
    status: 400,
    message: "the reservation_time is not in the range when the restaurant is operational"
  })






}



async function create(req, res) {

  const { data: { mobile_number } = {} } = req.body

  if (!mobile_number.includes("-")) {
    req.body.data.mobile_number = convertPhoneNumberWithDash(req.body.data.mobile_number)
  }


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
  create: [dataExists, FirstNameExists, lastNameExists, mobilePhoneExists, validTimes, reservationDateExists, validDays, reservationTimeExists, peopleExists, asyncErrorBoundary(create)]
};