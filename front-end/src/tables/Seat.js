import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom"
import Table from "./Table";
import Loader from "../Loader";

function Seat() {

    const { reservation_id } = useParams()
    const history = useHistory()

    const [tables, setTables] = useState([])
    const [tablesError, setTablesError] = useState(null)
    const [tableOption, setTableOption] = useState("")
    const [reservation, setReservation] = useState([])
    const [reservationError, setReservationError] = useState("")
    useEffect(loadTables, [])

    useEffect(loadReservation, [])



    async function loadReservation() {
        const abortController = new AbortController();

        try {

            const loadReservation = await fetch(`http://localhost:5001/reservations/${reservation_id}`, { signal: abortController.signal })
            const { data, error } = await loadReservation.json()

            if (error) {
                throw error
            }
            setReservation(data)

        } catch (error) {

            setReservationError(error)

        }
        // console.log("reservation", answer)
        return () => abortController.abort();

    }



    async function loadTables() {
        const abortController = new AbortController();
        setTablesError(null)
        try {

            const retrievedTables = await fetch("http://localhost:5001/tables", { signal: abortController.signal } // Pass the `AbortController` signal to `fetch()`
            )
            const { data, error } = await retrievedTables.json()


            if (error) {
                throw error
            } else if (data.length === 0) {
                throw "no table available at this moment"
            }
            setTables((tables) => tables.concat(data))

            const [{ table_id }] = data
            setTableOption(table_id)
        } catch (error) {
            setTablesError(error)
        }

        return () => abortController.abort();

    }


    function handleChange({ target }) {

        // console.log('ggg')
        // console.log("table option", target.value)
        setTableOption(target.value)
    }

    async function handleSubmit(e) {

        e.preventDefault()
        // const { capacity, reservation_id: seated, table_id } = tables.find(({ table_id }) => table_id === Number(tableOption))
        // const { people } = reservation


        // // if (!seated && people <= capacity) {

        // //     const updated = await fetch(`/tables/${table_id}/seat`, {

        // //         method: 'PUT',
        // //         headers: {
        // //             'Content-Type': 'application/json',
        // //         },
        // //         body: JSON.stringify({
        // //             data: { reservation_id }
        // //         }),
        // //     })

        // // } else {

        // // }


        try {
            const table = await fetch(`http://localhost:5001/tables/${tableOption}/seat`, {

                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: { reservation_id }
                }),
            })
            const { data, error } = await table.json()

            console.log('error', error)


            if (error) {
                throw error
            }

            history.push("/dashboard")

        } catch (error) {
            setTablesError(error)
        }


        // const answer = await updated.json()
        // console.log("people", people, "capacity", capacity, reservation_id)
    }


    return (

        <div>
            <form onSubmit={handleSubmit}>
                <Table tables={tables} handleChange={handleChange} tableOption={tableOption} />
                {/* <button type="submit">Submit</button> */}
                <input type="submit" value="Submit" />


            </form>
            <input type="submit" value="Submit" onClick={() => history.goBack()} />

            {/* <button type="button" className="btn btn-primary" onClick={() => history.goBack()}>Cancel</button> */}

            {tablesError && tablesError}
        </div>
    )
}



export default Seat