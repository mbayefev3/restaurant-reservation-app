import React from "react";
import ReservationCard from "./ReservationCard";

const ReservationCards = ({ reservations }) => {



    return (
        <div>

            {
                reservations.map((reservation) => <ReservationCard key={reservation.reservation_id} reservation={reservation}
                />)
            }
        </div>
    )
}


export default ReservationCards