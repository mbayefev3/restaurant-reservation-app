import React from "react";


function Table({ tables, handleChange, tableOption }) {
    return (
        <select className="form-select"
            value={tableOption}
            name="table_id" aria-label="Default select example" onChange={handleChange}>

            {
                tables.map(({ table_id, table_name, capacity }) => {
                    // <option value="">-- Select an Option --</option>

                    return <option value={table_id} key={table_id}>{`${table_name} - ${capacity}`}</option>
                })
            }
        </select>
    )
}



export default Table