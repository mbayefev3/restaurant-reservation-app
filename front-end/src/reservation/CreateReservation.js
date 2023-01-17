
import { useHistory } from "react-router-dom"
import React, { useState } from "react"

const CreateReservation = () => {

    const history = useHistory()
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: ""
    })
    const [error, setError] = useState("")






    const handleChange = ({ target }) => {

        setFormData((formData) => {
            return {
                ...formData,
                [target.name]: target.value
            }
        })
    }

    const handleFormSubmit = async (e) => {

        e.preventDefault()


        try {

            console.log('formData', formData)
            const response = await fetch('http://localhost:5001/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: formData
                }),
            })
            const { data } = await response.json()

            history.push(`/dashboard?date=${formData.reservation_date}`)
            // console.log('data', data)

        } catch (err) {


        }

    }


    // Jeremy Walker12:53 PM
    // https://calendly.com/jeremy_walker/30min


    // this func prevent negative value and enforced positive value
    const press = (event) => event.charCode != 8 && event.charCode == 0 || (event.charCode >= 48 && event.charCode <= 57)


    return (
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
    )

}


export default CreateReservation