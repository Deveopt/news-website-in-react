import React, { useState, useEffect } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import Card from '../Components/Card';
import { useParams } from "react-router-dom";
import Spinner from '../Components/Spinner';
import { FetchAPI } from '../utils/FetchAPI';

const Category = () => {

    const { category } = useParams();
    const [sort, setsort] = useState("popularity");
    const [Loading, setLoading] = useState(false);
    const [pageSize, setpageSize] = useState(1);
    const [error, seterror] = useState(null);
    const [Data, setData] = useState(null);
    const [errorMessage, seterrorMessage] = useState("");

    function fetchInitialData() {
        FetchAPI(`/everything?q=${category}&sortBy=${sort}&pageSize=30&page=${pageSize}&`)
            .then((data) => {
                setData(data);
                setpageSize((prev) => prev + 1)
            })
            .catch((err) => {
                seterror(err);
                seterrorMessage("Can't load Data! Please Check Your Internet Connection")
                console.log(err);
            });
    }

    function fetchNextPageData() {
        FetchAPI(`/everything?q=${category}&sortBy=${sort}&pageSize=30&page=${pageSize}&`)
            .then((res) => {
                if (res?.articles) {
                    setData({ ...Data, articles: [...Data.articles, ...res.articles] });
                } else {
                    seterrorMessage("Can't load more Data.")
                }
                setpageSize((prev) => prev + 1)
            })
            .catch((err) => {
                seterror(err);
            });
    }

    useEffect(() => {
        setpageSize(1);
        fetchInitialData();
    }, [sort, category])

    return (
        <div className='category w-full min-h-fit my-6'>
            <div className="topSection flex justify-between w-full px-5 items-center">
                <h2 className='text-2xl'>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                <div className="select">
                    <label htmlFor="sortselect">Sort by  </label>
                    <select onChange={(e) => setsort(e.target.value)} className='border-black border-2' name="sortselect" id="sortselect">
                        <option value="popularity">Popularity</option>
                        <option value="newest">Newest</option>
                        <option value="relevancy">Relevant First</option>
                    </select>
                </div>
            </div>
            {Loading && <Spinner initial={false} onFullPage={true} />}
            {
                !Loading &&
                (
                    <InfiniteScroll
                        hasMore={() => pageSize <= Math(Data?.totalResults / 30)}
                        next={() => fetchNextPageData()}
                        className='content'
                        dataLength={Data?.articles?.length || []}
                        loader={errorMessage !== "" ? <p className='text-center'>{errorMessage}</p> : <Spinner initial={false} onFullPage={false} />}
                    >
                        <div className="cards h-full w-full flex gap-1 my-6 flex-wrap justify-center">
                            {
                                Data?.articles?.map((i, idx) => (
                                    <a href={i.url}>
                                        <Card key={idx} Loading={Loading} title={i.title} src={i.urlToImage} />
                                    </a>
                                ))
                            }
                        </div>
                    </InfiniteScroll>
                )
            }
        </div>
    )
}

export default Category
