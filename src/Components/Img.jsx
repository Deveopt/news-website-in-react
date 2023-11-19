import React from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

const Img = ({ src, className, width, height }) => {
    return (
        <LazyLoadImage
            effect='blur'
            src={src}
            className={className}
            width={width}
            height={height}
        />
    )
}

export default Img
