import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useLocation } from "react-router-dom";
import formatReservationDate from "../utils/format-reservation-date";
import { next, today, previous } from "../utils/date-time";
import ReservationCards from "./ReservationCards";
import ToggleButtons from "./ToggleButtons";
import Loader from "../Loader";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {

  const location = useLocation();
  const reservationDate = new URLSearchParams(location.search).get("date") || today()

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const [changeDate, setChangeDate] = useState(reservationDate)
  const [notAvailable, setNotAvailable] = useState("")

  useEffect(loadDashboard, []);

  useEffect(loadChangeDate, [changeDate])



  async function loadDashboard() {
    const abortController = new AbortController();
    setNotAvailable("")
    setReservationsError(null);

    try {
      const reservationsData = await listReservations({ reservationDate }, abortController.signal)
      const retrievedReservations = await reservationsData

      if (retrievedReservations.length) {
        setReservations(retrievedReservations)
      } else {

        setNotAvailable(`No reservation is picked for this date ${changeDate}`)
      }

    } catch (err) {
      setReservationsError(err)
    }


    return () => abortController.abort();
  }

  async function loadChangeDate() {
    const abortController = new AbortController();
    setReservationsError(null)
    setReservations([])
    setNotAvailable("")

    try {
      const date = changeDate
      const reservationsDate = await listReservations({ date }, abortController.signal)
      const retrievedReservations = await reservationsDate

      if (retrievedReservations.length) {
        setReservations(retrievedReservations)
      } else {

        setNotAvailable(`No reservation is picked for this ${changeDate}`)
      }

    } catch (err) {

      setReservationsError(err)
    }

    return () => abortController.abort();


  }




  function handleNextDate() {
    setChangeDate((changeDate) => next(changeDate))
  }

  function handleTodayDate() {

    setChangeDate((changeDate) => today())
  }

  function handlePreviousDate() {

    setChangeDate((changeDate) => previous(changeDate))
  }






  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      {reservationsError && <ErrorAlert error={reservationsError} />}

      <div>

        {reservations.length ? <ReservationCards reservations={reservations} />
          : ""}
        {!reservations.length && !notAvailable ? <Loader /> : ""}
        {notAvailable && !reservations.length ? notAvailable : ""}
        <ToggleButtons handleNextDate={handleNextDate}
          handlePreviousDate={handlePreviousDate}
          handleTodayDate={handleTodayDate} />
      </div>

    </main>
  );
}


export default Dashboard;