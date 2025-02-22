import { useEffect, useState } from "react";
import axios from "axios"
import { LogoImage } from "./LogoImage";

export function StartupsData() {
  const [startups, setStartups] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("")


  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("https://bigbrain-an4r.onrender.com/all-about-startups")
        if (res.data.startups) {
          setStartups(res.data.startups);   
        } else {  
          alert("failed to fetch news from server");
        }
      } catch (err) {
        setError("some internal error occured");
      } finally {
        setLoading(false);
      }

    }
    fetchNews();
  }, [])

  return (
    <div className="min-h-screen text-white bg-black flex flex-col items-center p-6">
      <LogoImage />
      <h3 className="text-2xl font-bold mb-4 border-b-2 border-gray-700 pb-2>Startup News mt-12">Startup News</h3>
      <br></br>
      {loading ? (
        <p className="text-gray-400 animate-pulse">loading news...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="w-full max-w-2xl flex flex-col gap-4">
          {startups.map((startup, key) => (
            <div key={key} className="p-4 rounded-lg shadow-lg hover:bg-gray-900 transition">
              <a href={startup.link} className="text-white hover:underline block text-lg font-medium">
                {startup.title}
              </a>
            </div>
          ))}   
        </div>
      )}
    </div>
  )
}