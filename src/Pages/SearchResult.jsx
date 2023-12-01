import React, { useState, useEffect } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import Card from '../Components/Card';
import { useParams } from "react-router-dom";
import { FetchAPI } from '../utils/FetchAPI';
import Spinner from '../Components/Spinner';

const SearchResult = () => {

    const { search } = useParams();
    const [sort, setsort] = useState("popularity");
    const [Loading, setLoading] = useState(false);
    const [pageSize, setpageSize] = useState(1);
    const [error, seterror] = useState(null);
    const [Data, setData] = useState(null);
    const [errorMessage, seterrorMessage] = useState("");

    function fetchInitialData() {
        setLoading(true);
        FetchAPI(`/everything?q=${search}&sortBy=${sort}&pageSize=30&page=${pageSize}&`)
            .then((data) => {
                setData(data);
                setLoading(false);
                setpageSize((prev) => prev + 1)
            })
            .catch((err) => {
                setLoading(false);
                seterror(err);
            });
    }

    function fetchNextPageData() {
        FetchAPI(`/everything?q=${search}&sortBy=${sort}&pageSize=30&page=${pageSize}&`)
            .then((res) => {
                if (res?.articles) {
                    setData({ ...Data, articles: [...Data.articles, ...res.articles] });
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
    }, [sort, search])

    return (
        <div className='searchResult w-full min-h-fit my-6'>
            <div className="topSection flex justify-between w-full items-center px-20">
                <h2 className='text-2xl'>Results for {search}</h2>
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
                        hasMore={() => pageSize <= Math(Data?.totalResults / 30)}
                        next={() => fetchNextPageData()}
                        className='content'
                        dataLength={Data?.articles?.length || []}
                        loader={errorMessage !== "" ? <p className='text-center'>{errorMessage}</p> : <Spinner />}
                    >
                        <div className="cards h-full w-full flex gap-1 my-6 flex-wrap justify-center">
                            {
                                Data?.articles?.length > 0 ?
                                    Data?.articles?.map((i, idx) => (
                                        <a href={i.url}>
                                            <Card key={idx} Loading={Loading} title={i.title} src={i.urlToImage} />
                                        </a>
                                    )) : (
                                        <h3>Sorry, No Results Found for keyword "{search}"</h3>
                                    )
                            }
                        </div>
                    </InfiniteScroll>
                )
            }
        </div>
    )
}

export default SearchResult
