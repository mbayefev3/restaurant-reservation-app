import React from "react";


const ReservationCard = ({ reservation: { first_name, last_name, mobile_number, reservation_date, reservation_time, people, reservation_id } }) => {


    return (

        <div className="card" style={{ width: "18rem" }}>
            <div className="card-header">
                <p>Reservation_id {reservation_id}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">FirstName: {first_name}</li>
                <li className="list-group-item">LastName: {last_name}</li>
                <li className="list-group-item">Mobile Number: {mobile_number}</li>
                <li className="list-group-item"> Reservation Date: {reservation_date}</li>
                <li className="list-group-item">Reservation Time: {reservation_time}</li>
                <li className="list-group-item">Size: {people}</li>


            </ul>
        </div>


    )
}


export default ReservationCard


