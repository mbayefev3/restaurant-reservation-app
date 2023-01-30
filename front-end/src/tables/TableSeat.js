import React from "react"
// import ShowModal from "../Modal"
import { useHistory } from "react-router-dom"



function TableSeat({ table_name, capacity, reservation_id, table_id, handleRemoveTable, load }) {

    const history = useHistory()


    function Modal() {
        if (window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
            handleRemoveTable(table_id)
            // load()
        }
    }

    return (
        <>
            <div className="card-header">
                {table_id}
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">{table_name}</li>
                <li className="list-group-item">{capacity}</li>
                <li className="list-group-item"
                    data-table-id-status={table_id}

                >{reservation_id ? "occupied" : "free"}</li>
                <li>  {reservation_id ? <button type="button" data-table-id-finish={table_id} onClick={() => Modal()}>Finish</button> : ""}
                </li>
            </ul>
        </>
    )
}



export default TableSeat