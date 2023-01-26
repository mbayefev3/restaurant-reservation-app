import React from "react";

import TableSeat from "./TableSeat"



function TableSeats({ tables, handleRemoveTable, load }) {

    return (
        <div className="card" style={{ width: "18rem" }}>
            {
                tables.map(({ table_id, table_name, capacity, reservation_id }) =>
                    <TableSeat key={table_id}
                        table_name={table_name} capacity={capacity}
                        reservation_id={reservation_id} table_id={table_id}
                        handleRemoveTable={handleRemoveTable} load={load} />)
            }
        </div>
    )
}



export default TableSeats