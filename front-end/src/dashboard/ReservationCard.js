import React, { useState } from "react";
import { Link } from "react-router-dom"

const ReservationCard = ({ reservation: { first_name, last_name, mobile_number, reservation_date, reservation_time, people, reservation_id, status } }) => {



    async function handleStatusChange() {

        const reservationsData = await fetch(`/reservations/${reservation_id}/status`, {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: { status: "seated" }
            })

        })

        const reservations = await reservationsData.json()
    }

    // console.log("booked", status)


    return (

        <div className="card" style={{ width: "10rem" }}>
            <div className="card-header">
                <p>Reservation Number: {reservation_id}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">FirstName: {first_name}</li>
                <li className="list-group-item">LastName: {last_name}</li>
                <li className="list-group-item">Mobile Number: {mobile_number}</li>
                <li className="list-group-item"> Reservation Date: {reservation_date}</li>
                <li className="list-group-item">Reservation Time: {reservation_time}</li>
                <li className="list-group-item">Size: {people}</li>
                <li data-reservation-id-status={reservation_id}>{status}</li>
                <li>
                    <Link to={`/reservations/${reservation_id}/seat`}>
                        {
                            status === "booked" ? <button href={`/reservations/${reservation_id}/seat`} onClick={handleStatusChange}>
                                Seat
                            </button> : ""
                        }
                    </Link>
                </li>
            </ul>
        </div>


    )
}


export default ReservationCard


