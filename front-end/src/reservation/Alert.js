import React from "react";


function Alert({ error }) {

    return (
        <div className={`${error.length ? "alert" : ""}  alert-danger`}>

            {
                error.map((err, i) => <p key={i}>{err}</p>)
            }
        </div>
    )

}



export default Alert