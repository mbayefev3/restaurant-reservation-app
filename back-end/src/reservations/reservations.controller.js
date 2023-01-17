/**
 * List handler for reservation resources
 */
async function list(req, res) {
  res.json({
    data: [],
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

function isReservationDateExists(req, res, next) {
  const { data: { reservation_date } = {} } = req.body

}

// reservation_date

// returns 400 if mobilePhone is missing

module.exports = {
  list,
};
