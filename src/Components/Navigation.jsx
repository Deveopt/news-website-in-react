import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FetchAPI } from '../utils/FetchAPI';
import { scroll } from '../utils/scroll';

const Navigation = () => {

    const [categories, setcategories] = useState([]);
    const ulRef = useRef(null);

    useEffect(() => {
        (async () => {
            const data = await FetchAPI("/top-headlines/sources?")
            let categoriesData = await data.sources.map((item) => { return item.category });
            categoriesData = await categoriesData.filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
            setcategories(categoriesData);
        })()
    }, [])

    return (
        <>
            <div className='container min-h-10 mx-auto relative'>
                <ul className='flex gap-4 justify-center h-full items-center flex-wrap md:flex-nowrap overflow-x-auto w-full' ref={ulRef} >
                    <li><NavLink to={"/"} className={({ isActive }) => `${isActive ? "activenav" : ""} text-sm`} >All</NavLink></li>
                    {
                        categories?.map((i, idx) => (
                            <li key={idx}><NavLink to={"/" + i} className={({ isActive }) => `${isActive ? "activenav" : ""} text-sm`} >{i.charAt(0).toUpperCase() + i.slice(1)}</NavLink></li>
                        ))
                    }
                    <li><NavLink to={"/coding"} className={({ isActive }) => `${isActive ? "activenav" : ""} text-sm`} >Coding</NavLink></li>
                </ul>
            </div>
        </>
    )
}

export default Navigation;
