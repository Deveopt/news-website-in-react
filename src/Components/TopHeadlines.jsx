import React, { useEffect, useState } from 'react';
import { FetchAPI } from '../utils/FetchAPI';
import InfiniteScroll from "react-infinite-scroll-component";
import Card from './Card';
import Spinner from './Spinner';

const TopHeadlines = () => {

    const [sort, setsort] = useState("popularity");
    const [Loading, setLoading] = useState(false);
    const [pageSize, setpageSize] = useState(1);
    const [error, seterror] = useState(null);
    const [errorMessage, seterrorMessage] = useState("");
    const [data, setdata] = useState(null);


    console.log(sort)

    function fetchInitialData() {
        setLoading(true);
        FetchAPI(`/everything?q=all&sortBy=${sort}&pageSize=30&page=${pageSize}&`)
            .then((data) => {
                setdata(data);
                setLoading(false);
                setpageSize((prev) => prev + 1)
            })
            .catch((err) => {
                setLoading(false);
                seterror(err);
            });

    }

    function fetchNextPageData() {
        FetchAPI(`/everything?q=all&sortBy=${sort}&pageSize=30&page=${pageSize}&`)
            .then((res) => {
                if (res?.articles) {
                    setdata({ ...data, articles: [...data.articles, ...res.articles] });
                    setpageSize((prev) => prev + 1)
                } else {
                    seterrorMessage("Can't load more Data.")
                }
            })
            .catch((err) => {
                seterror(err);
            });
    }

    useEffect(() => {
        setpageSize(1);
        fetchInitialData();
    }, [sort])

    return (
        <div className='topHeadlines w-full min-h-fit my-6'>
            <div className="topSection flex justify-between w-full items-center">
                <h2 className='text-2xl'>Top Headlines</h2>
                <div className="select">
                    <label htmlFor="sortselect">Sort by  </label>
                    <select onChange={(e) => setsort(e.target.value)} className='border-black border-2' name="sortselect" id="sortselect">
                        <option value="popularity">Popularity</option>
                        <option value="newest">Newest</option>
                        <option value="relevancy">Relevant First</option>
                    </select>
                </div>
            </div>
            {Loading && <Spinner initial={true} />}
            {
                !Loading &&
                (
                    <InfiniteScroll
                        hasMore={() => pageSize <= Math(data?.totalResults / 30)}
                        next={() => fetchNextPageData()}
                        className='content'
                        dataLength={data?.articles?.length || []}
                        loader={errorMessage !== "" ? <p className='text-center'>{errorMessage}</p> : <Spinner />}
                    >
                        <div className="cards h-full w-full flex gap-1 my-6 flex-wrap justify-center">
                            {
                                data?.articles?.map((i, idx) => (
                                    <a href={i.url}>
                                        <Card key={idx} title={i.title} src={i.urlToImage} />
                                    </a>
                                ))
                            }
                        </div>
                    </InfiniteScroll>
                )
            }
        </div >
    )
}

export const CardSkeleton = () => {
    return (
        <>
            <div className='card h-fit my-2 w-80 p-2 rounded-md'>
                <div className="cardImageContainer h-44 w-full rounded-md bg-gray-400">
                </div>
                <div className="CardTextContainer h-10 rounded-md bg-gray-400 w-full">
                </div>
                <div className="CardTextContainer h-10 rounded-md bg-gray-400 w-full">
                </div>
            </div>
        </>
    )
}

export default TopHeadlines;
