import { useEffect, useState } from "react"
import axios from "axios";
import { LogoImage } from "./LogoImage";

export function CryptoLists() {
    const [news, setNews] = useState("");
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await axios.get("https://bigbrain-an4r.onrender.com/cryptonews")
                console.log(res.data);
                if (res.data.news) {
                    setNews(res.data.news)
                } else {
                    alert("failed to fetch news from server")
                }
            } catch (err) {
                setError("failed to fetch news");
            } finally {
                setLoading(false);
            }
        }
        fetchNews();
    }, [])

    return (
        <div className="min-h-screen text-white bg-black flex flex-col items-center p-6">
            <LogoImage />
            <h3 className="text-2xl font-bold mb-4 border-b-2 border-gray-700 pb-2>Startup News mt-12">Crypto News</h3>
            <br></br>
            {loading ? (
                <p className="text-gray-400 animate-pulse">loading news...</p>
            ) : error ? (
                <p clasName='text-red-500'>{error}</p>
            ) : (
                <div className="w-full max-w-2xl flex flex-col gap-4">
                    {news.map((news, key) => (
                        <div key={key} className="bg-gray-200 p-4 rounded-lg shadow-lg hover:bg-gray-400 transition">
                            <a href={news.link} className="text-black hover:underline block text-lg font-medium">
                                {news.title}
                            </a>
                        </div>
                    ))}

                </div>

            )}
        </div>
    )
}   
