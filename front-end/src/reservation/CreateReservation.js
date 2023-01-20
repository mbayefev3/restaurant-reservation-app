
import { useHistory } from "react-router-dom"
import React, { useState } from "react"
import { today } from "../utils/date-time"
import moment from "moment"
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


    // 2023-01-17


    function handleChange({ target }) {

        setError([])

        // if (target.name === 'reservation_date' && moment(target.value, "MM-DD-YYYY").format('dddd') === "Tuesday") {

        //     setError("Closed on Tuesdays")
        // } else {
        setFormData((formData) => {
            return {
                ...formData,
                [target.name]: target.name === "people" ? Number(target.value) : target.value
            }
        })
        // }

    }


    // const todayDate = moment("2023-01-18", "YYYY-MM-DD").isBefore(today())

    // console.log("today", todayDate, today())
    const handleFormSubmit = async (e) => {

        e.preventDefault()



        const { reservation_date } = formData
        const date = moment(reservation_date, "YYYY-MM-DD").format('dddd')
        const todayDate = moment(reservation_date, "YYYY-MM-DD").isBefore(today())

        if (todayDate) {
            setError((error) => error.concat("The reservation date is in the past. Only future reservations are allowed."))
        }
        if (date === "Tuesday") {
            setError((error) => error.concat("The reservation date is a Tuesday as the restaurant is closed on Tuesdays."))

        } else {
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

                if (error) {
                    throw error
                }
                history.push(`/dashboard?date=${formData.reservation_date}`)

            } catch (err) {

                setError((error) => error.concat(err))
            }
        }
    }






    // The /reservations/new page will display an error message with className="alert alert-danger" if any of the following constraints are violated:
    // The reservation date is a Tuesday as the restaurant is closed on Tuesdays.
    // The reservation date is in the past. Only future reservations are allowed.








    //press prevent negative value from being entered
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
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="800-555-1212"
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
            <div className="alert alert-danger">{
                error.map((err, i) => <p key={i}>{err}</p>)
            }</div>
        </>
    )

}


export default CreateReservation