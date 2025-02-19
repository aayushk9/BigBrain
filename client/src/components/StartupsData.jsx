import { useEffect, useState } from "react";
import axios from "axios"

export function StartupsData(){
  const [news, setNews] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("")


  useEffect(() => {
     const fetchNews = async () => {
      try {
        const res = await axios.get("http://localhost:3000/all-about-startups")
         if(res.data.news){
            setNews(res.data.news);
         } else {
          alert("failed to fetch news from server");
         }
      } catch(err){
         setError("some internal error occured");
      } finally {
        setLoading(false);  
      }
         
     }
     fetchNews();
  }, [])

    return (
        <div>
          <h3>Startup News</h3>
           {loading ? (
            <p>loading news...</p>
           ): error ? (
            <p>{error}</p>  
           ): (
              news.map((news, key) => (
               <ul>
                <li id={key}>{news.title}, {news.link}</li>
               </ul>
              ))
           )}
        </div>  
    )     
}