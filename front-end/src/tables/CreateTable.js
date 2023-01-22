import React from "react"
import { useHistory } from "react-router"
import { useState } from "react"

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


    function handleChange({ target }) {

        setFormData((formData) => {

            return {
                ...formData,
                [target.name]: target.name === "capacity" ? Number(target.value) : target.value
            }
        })
    }

    function handleFormSubmit(e) {
        e.preventDefault()

        console.log('form', formData)
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
                        min="1"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}

                    />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" className="btn btn-primary" onClick={() => history.goBack()}>Cancel</button>

            </form>


        </>
    )

}


export default CreateTable