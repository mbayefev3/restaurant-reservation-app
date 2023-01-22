
import { useHistory } from "react-router-dom"
import React, { useState } from "react"
import { today } from "../utils/date-time"
import moment from "moment"
import Alert from "./Alert"
function CreateReservation() {

    const history = useHistory()
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: ""
    })
    const [error, setError] = useState([])


    function handleChange({ target }) {

        setError([])

        setFormData((formData) => {
            return {
                ...formData,
                [target.name]: target.name === "people" ? Number(target.value) : target.value
            }
        })

    }



    const handleFormSubmit = async (e) => {

        console.log('form', formData)

        e.preventDefault()

        setError([])
        // The reservation time is after 9:30 PM, because the 
        // restaurant closes at 10:30 PM and the customer needs to have time to enjoy their meal.

        const { reservation_date, reservation_time } = formData
        const reservationTime = moment(reservation_time, "HH:mm") //24h
        const openTime = moment("10:30", "HH:mm")
        const beforeClosedTime = moment("21:30", "HH:mm")
        const reservedBeforeOpen = reservationTime.isBefore(openTime)
        const reservedWhenOpen = reservationTime.isAfter(beforeClosedTime)



        //         var time = moment('09:34:00',format),
        //   beforeTime = moment('08:34:00', format),
        //   afterTime = moment('10:34:00', format);
        const validReservationTime = reservationTime.isBetween(openTime, beforeClosedTime)
        // if (time.isBetween(beforeTime, afterTime)) {




        const reservationDate = moment(reservation_date, "YYYY-MM-DD").format('dddd') //this gives us the day
        const todayDate = moment(reservation_date, "YYYY-MM-DD").isBefore(today())

        if (!validReservationTime) {
            setError((error) => error.concat("no available time to reserved."))
        }
        if (todayDate) {
            setError((error) => error.concat("The reservation date is in the past. Only future reservations are allowed."))
        }
        if (reservationDate === "Tuesday") {
            setError((error) => error.concat("The reservation date is a Tuesday as the restaurant is closed on Tuesdays."))

        }


        if (!todayDate && reservationDate !== "Tuesday" && validReservationTime) {
            console.log('hello yea')
            try {

                const response = await fetch('http://localhost:5001/reservations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        data: formData
                    }),
                })
                const { data, error } = await response.json()

                // console.log('errrorrr', error,data)

                if (error) {
                    throw error
                }
                history.push(`/dashboard?date=${formData.reservation_date}`)

            } catch (err) {

                setError((error) => error.concat(err))
            }
        }
    }




    //press func prevent negative value from being entered
    const press = (event) => event.charCode != 8 && event.charCode == 0 || (event.charCode >= 48 && event.charCode <= 57)


    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                    <label htmlFor="first_name" className="form-label">First name:</label>
                    <input type="text" className="form-control" id="first_name" aria-describedby="emailHelp" name="first_name"
                        value={formData.first_name} required
                        onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="last_name" className="form-label">Last name:</label>
                    <input type="text" className="form-control" id="last_name" required
                        value={formData.last_name}
                        name="last_name"
                        onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="mobile_number" className="form-label">Mobile number:</label>
                    <input type="tel" className="form-control" id="mobile_number" aria-describedby="emailHelp" name="mobile_number" required
                        // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="800-555-1212"
                        value={formData.mobile_number}
                        onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="reservation_date" className="form-label"> Date of reservation:</label>
                    <input
                        type="date" placeholder="YYYY-MM-DD" pattern="\d{4}-\d{2}-\d{2}"
                        className="form-control" id="reservation_date" aria-describedby="emailHelp" name="reservation_date" required
                        onChange={handleChange} value={formData.reservation_date} />
                </div>
                <div className="mb-3">
                    <label htmlFor="reservation_time" className="form-label"> Time of reservation</label>

                    <input
                        type="time" placeholder="HH:MM" pattern="[0-9]{2}:[0-9]{2}"
                        className="form-control" id="reservation_time" aria-describedby="emailHelp" name="reservation_time" required
                        onChange={handleChange} value={formData.reservation_time} />
                </div>
                <div className="mb-3">
                    <label htmlFor="people" className="form-label"> Number of people in the party:</label>
                    <input type="number" className="form-control" id="people"
                        onKeyPress={press}
                        aria-describedby="emailHelp" name="people" required min="1"

                        onChange={handleChange} value={formData.people} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" className="btn btn-primary" onClick={() => history.goBack()}>Cancel</button>

            </form>

            <Alert error={error} />

        </>
    )

}


export default CreateReservation