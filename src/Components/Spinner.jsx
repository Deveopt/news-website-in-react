import React from 'react'

const Spinner = ({ initial }) => {
    return (
        <div className="flex items-center justify-center w-full" style={{ height: initial ? "500px" : "200px" }} >
            <div className={"border-t-4 border-blue-500 border-solid rounded-full animate-spin h-12 w-12"}></div>
        </div>
    )
}

export default Spinner