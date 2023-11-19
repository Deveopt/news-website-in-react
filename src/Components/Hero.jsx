import React, { useState } from 'react';
import { useFetch } from "../hooks/useFetch";
import logo from "../assets/newslogo.jpg";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import Img from './Img';

const Hero = () => {

    const random = Math.floor(Math.random() * 10);
    const { Data, Loading, error } = useFetch("/top-headlines?country=us&pageSize=10&");

    return (
        <>
            {
                !Loading && <div className="heroSection w-full relative z-40 mb-4 h-96">
                    <div className="darklayer absolute top-0 left-0 z-20 bg-black opacity-40 w-full h-full "></div>
                    <Img src={Data?.articles[random]?.urlToImage} className={'absolute top-0 left-0 object-cover object-center w-full h-full z-10'} width={"100%"} height={"100%"} />
                    <Link to="/">
                        <div className="topLogo w-30 px-2 md:w-44 md:px-auto bg-black flex items-center justify-center gap-2 text-white h-12 rounded-full z-40 absolute top-4 left-4">
                            <img src={logo} width={40} height={40} className='rounded-full HeroLogoImg' />
                            <p className='logoTextHero'>Mount News</p>
                        </div>
                    </Link>

                    <div className="textBox absolute bottom-4 w-3/4 left-5 text-white text-xl z-30">
                        <a href={Data?.articles[random]?.url} target='_blank'>
                            <h2 className='text-xs md:text-sm' >{dayjs(Data?.articles[random]?.publishedAt).format("YYYY DD,MM")}</h2>
                            <h2 className='text-sm md:text-xl'>{Data?.articles[random]?.title}.</h2>
                            <button className=' w-20 rounded-lg h-8 text-xs mt-2 md:text-sm md:w-36 md:h-10' style={{ background: "#06021D" }} >Check out!</button>
                        </a>
                    </div>
                </div >
            }


        </>
    )
}

export default Hero
