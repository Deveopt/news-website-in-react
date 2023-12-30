import React from 'react'

const Spinner = ({ initial, onFullPage }) => {
    return (
        <div className="flex items-center justify-center w-full" style={{ height: initial ? "300px" : onFullPage ? "500px" : "100px" }} >
            <div style={{ border: "8px solid gray", borderTop: "8px solid", borderTopColor: "#06021D" }} className={"  rounded-full animate-spin h-14 w-14"}></div>
        </div>
    )
}

export default Spinner;
