import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/newslogo.jpg";
import { ConvertSearchQuery } from '../utils/ConvertSeachQuery';

const Header = () => {
    const [search, setsearch] = useState("");
    const navigate = useNavigate();
    function clickHandler() {
        ConvertSearchQuery(search);
        return navigate(`/search/${search}`);
    }
    return (
        <>
            <header className="text-gray-600 body-font" >
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
                    <Link to={"/"} className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <img src={logo} width={50} height={50} />
                        <span className="ml-3 text-xl">MountNews</span>
                    </Link>
                    <div className="searchInputBox flex item-center border-2 border-black rounded-lg pl-1 w-full md:w-96" >
                        <input type="text" placeholder='Search your desires...' value={search} onChange={(e) => setsearch(e.target.value)} className='flex-1 pl-4 outline-none text-sm' />
                        <button className='text-white px-3 md:text-md md:px-4 text-sm rounded-md py-2' style={{ background: "#06021D" }} onClick={() => clickHandler()}>Search</button>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
