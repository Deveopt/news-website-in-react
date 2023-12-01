import axios from "axios";

const apiKey = import.meta.env.VITE_APP_API_KEY; // Get your own from news api search on google

export const FetchAPI = async (url) => {
    try {
        const { data } = await axios.get(`https://newsapi.org/v2${url}apiKey=`)
        return data;
    } catch (error) {
        console.log(error);
    }
}