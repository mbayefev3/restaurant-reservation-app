import React from "react"
import { useHistory } from "react-router"
import { useState } from "react"
import Alert from "../Alert"
// The /tables/new page will

// have the following required and not-nullable fields:
// Table name: <input name="table_name" />, which must be at least 2 characters long.
// Capacity: <input name="capacity" />, this is the number of people that can be seated at the table, which must be at least 1 person.
// display a Submit button that, when clicked, saves the new table then displays the /dashboard page
// display a Cancel button that, when clicked, returns the user to the previous page






function CreateTable() {

    const history = useHistory()

    const [formData, setFormData] = useState({
        table_name: "",
        capacity: ""
    })

    const [errors, setErrors] = useState([])

    function handleChange({ target }) {

        setErrors([])
        setFormData((formData) => {

            return {
                ...formData,
                [target.name]: target.name === "capacity" ? Number(target.value) : target.value
            }
        })
    }

    async function handleFormSubmit(e) {
        e.preventDefault()

        try {
            const response = await fetch("http://localhost:5001/tables", {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: formData
                }),
            })

            const { data, error } = await response.json()

            console.log("datatatat", data)
            if (error) {
                throw error
            }

            history.push("/dashboard")
        } catch (err) {
            setErrors((errors) => errors.concat(err))
        }
    }
    return (
        <>
            <form onSubmit={handleFormSubmit} >
                <div className="mb-3">
                    <label htmlFor="table_name" className="form-label">Table name:</label>
                    <input type="text" className="form-control" id="table_name" aria-describedby="emailHelp" name="table_name"
                        required
                        minLength="2"
                        value={formData.table_name}

                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="capacity" className="form-label">Capacity:</label>
                    <input type="number" className="form-control" id="capacity" required

                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        min="1"
                    />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" className="btn btn-primary" onClick={() => history.goBack()}>Cancel</button>

            </form>

            <Alert error={errors} />
        </>
    )

}


export default CreateTable