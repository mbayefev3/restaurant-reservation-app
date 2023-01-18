import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useLocation } from "react-router-dom";
import formatReservationDate from "../utils/format-reservation-date";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const location = useLocation();

  const reservationDate = new URLSearchParams(location.search).get("date")
  useEffect(loadDashboard, [date, reservationDate]);


  function loadDashboard() {
    const abortController = new AbortController();

    setReservationsError(null);

    if (reservationDate) {

      console.log('reservations', reservationDate)
      listReservations({ reservationDate }, abortController.signal)
        .then(setReservations)
        .catch(setReservationsError);

    } else {

      listReservations({ date }, abortController.signal)
        .then(setReservations)
        .catch(setReservationsError);
    }
    return () => abortController.abort();
  }
  console.log('daaa', reservations)

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;