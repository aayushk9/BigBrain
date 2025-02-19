import { useEffect, useState } from "react"
import axios from "axios";

export function CryptoLists(){
    const [news, setNews] = useState("");
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchNews = async() => {
            try{
                const res = await axios.get("http://localhost:3000/cryptonews")
                console.log(res.data);
                if(res.data.news){
                    setNews(res.data.news)   
                } else {
                    alert("failed to fetch news from server")
                }  
            } catch(err){
                setError("failed to fetch news");
            } finally{
                setLoading(false);
            }  
        }    
        fetchNews();
    }, [])

    return (
        <div>
            <h3>Crypto News</h3>
            {loading ? (
                <p>loading news...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <ul>
                    {news.map((news, index) => (
                        <li key={index}>{news.title}, {news.link}</li>
                    ))}     
                </ul>
            )}
        </div>
    )
}   