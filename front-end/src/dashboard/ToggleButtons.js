import React from "react";

const ToggleButtons = ({ handleNextDate, handlePreviousDate, handleTodayDate }) => {

    return (
        <div>

            {/* next, previous, and today */}
            <button className="btn btn-primary" onClick={handleNextDate}>Next</button>
            <button className="btn btn-primary" onClick={handlePreviousDate}>Previous</button>
            <button className="btn btn-primary" onClick={handleTodayDate}>Today</button>

        </div>
    )
}


export default ToggleButtons