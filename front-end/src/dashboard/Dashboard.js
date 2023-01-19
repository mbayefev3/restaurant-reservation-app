import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useLocation } from "react-router-dom";
import formatReservationDate from "../utils/format-reservation-date";
import { next, today, previous } from "../utils/date-time";
import ReservationCards from "./ReservationCards";
import ToggleButtons from "./ToggleButtons";
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

  useEffect(loadDashboard, []);

  useEffect(loadChangeDate, [changeDate])



  function loadDashboard() {
    const abortController = new AbortController();

    setReservationsError(null);

    listReservations({ reservationDate }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    return () => abortController.abort();
  }

  function loadChangeDate() {
    const abortController = new AbortController();
    setReservationsError(null)
    setReservations([])

    const date = changeDate

    console.log('date', date)
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

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
      <ErrorAlert error={reservationsError} />
      {/* {reservations.length && <ReservationCards reservations={reservations} />}
      {reservations.length && <ToggleButtons handleNextDate={handleNextDate} />} */}

      <ReservationCards reservations={reservations} />
      <ToggleButtons handleNextDate={handleNextDate}
        handlePreviousDate={handlePreviousDate}
        handleTodayDate={handleTodayDate} />

    </main>
  );
}


export default Dashboard;