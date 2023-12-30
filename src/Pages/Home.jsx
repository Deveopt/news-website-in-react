import React from 'react';
import Hero from '../Components/Hero';
import Section from '../Components/Section';
import TopHeadlines from '../Components/TopHeadlines';

const Home = () => {


    return (
        <>
            <div className="min-h-screen mx-auto py-10">
                <Hero />
                <Section query={"cricket"} heading={"Cricket"} />
                <Section query={"health"} heading={"Health"} />
                <Section query={"ai"} heading={"AI"} />
                <TopHeadlines />
            </div>
        </>
    )
}

export default Home
