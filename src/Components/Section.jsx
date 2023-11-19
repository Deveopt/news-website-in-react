import React from 'react';
import { useFetch } from "../hooks/useFetch";
import CarousalItem from './CarousalItem';
import { Link } from 'react-router-dom';

const Section = ({ query, heading }) => {

    const random3 = Math.floor(Math.random() * 10 + 20);
    const random2 = Math.floor(Math.random() * 10 + 10);
    const random = Math.floor(Math.random() * 10);
    const { Data, Loading, error } = useFetch(`/everything?q=${query}&pageSize=30&`);

    return (
        <>
            {
                !Loading && <div className='Section w-full relative flex flex-col gap-3 items-center'>
                    <h2 className='text-2xl my-6'>{heading}</h2>
                    <div className="carousal w-full overflow-x-hidden gap-2 md:gap-4 flex-wrap lg:flex-nowrap flex px-2 h-3/4">
                        <a href={Data?.articles[random]?.url} className='w-full h-full'>
                            <CarousalItem src={Data?.articles[random]?.urlToImage} title={Data?.articles[random]?.title} key={random} />
                        </a>
                        <a href={Data?.articles[random2]?.url} className='w-full h-full'>
                            <CarousalItem src={Data?.articles[random2]?.urlToImage} title={Data?.articles[random2]?.title} key={random2} />
                        </a>
                        <a href={Data?.articles[random3]?.url} className='w-full h-full'>
                            <CarousalItem src={Data?.articles[random3]?.urlToImage} title={Data?.articles[random3]?.title} key={random3} />
                        </a>
                    </div>
                    <Link to={`/search/${query}`} className='text-white text-sm px-4 py-2 rounded-lg' style={{ background: "#06021D" }} >Get More About {heading}</Link>
                </div>
            }
        </>
    )
}

export default Section
