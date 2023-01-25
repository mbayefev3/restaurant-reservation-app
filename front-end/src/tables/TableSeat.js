import React from "react"


function TableSeat({ table_name, capacity, reservation_id, table_id }) {

    return (
        <>
            <div className="card-header">
                {table_id}
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">{table_name}</li>
                <li className="list-group-item">{capacity}</li>
                <li className="list-group-item"
                    data-table-id-status={`${table_id}`}

                >{reservation_id ? "Occupied" : "Free"}</li>
            </ul>
        </>
    )
}



export default TableSeat