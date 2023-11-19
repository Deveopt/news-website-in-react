import React from 'react'
import Img from './Img'

const CarousalItem = ({ src, title }) => {
    return (
        <div className='CarousalItem h-80 w-full md:32 relative z-10 rounded-lg overflow-hidden'>
            <Img src={src} width={"100%"} height={"100%"} className={"w-full h-full absolute top-0 left-0 object-cover object-center"} />
            <div className="darklayer absolute top-0 left-0 bg-black opacity-40 z-20 w-full h-full"></div>
            <h2 className='text-md sm:text-lg md:text-2xl absolute text-white bottom-10 text-center px-2 left-0 md:left-6 z-50'>{title}.</h2>
        </div >
    )
}

export default CarousalItem
