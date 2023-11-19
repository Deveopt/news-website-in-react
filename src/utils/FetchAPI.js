import axios from "axios";

export const FetchAPI = async (url) => {
    try {
        const { data } = await axios.get(`https://newsapi.org/v2${url}apiKey=${import.meta.env.VITE_APP_API_KEY}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}