import { FetchAPI } from "../utils/FetchAPI";
import { useState, useEffect } from "react";

export const useFetch = (url) => {
    const [Data, setData] = useState(false);
    const [Loading, setLoading] = useState(true);
    const [error, seterror] = useState(false);

    useEffect(() => {
        FetchAPI(url)
            .then((response) => {
                setLoading(false);
                setData(response);
            })
            .catch((err) => {
                setLoading(false);
                seterror(err);
            })
    }, [url])

    return { Data, error, Loading };
}