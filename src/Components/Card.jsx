import React from 'react';
import Img from './Img';
import PlaceholderImage from "../assets/imgplaceholder.png";

const Card = ({ src, title }) => {
    return (
        <div className='card h-fit my-2 w-80 p-2 rounded-md'>
            <div className="cardImageContainer h-44 w-full bg-gray-300">
                <Img src={src ? src : PlaceholderImage} className={"cardImage w-full h-full"} width={"100%"} height={"100%"} />
            </div>
            <div className="CardTextContainer h-1/2 w-full">
                <h2 className="title">{title}.</h2>
            </div>
        </div>
    )
}

export default Card
