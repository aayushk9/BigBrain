const axios = require("axios");
const xml2js = require("xml2js"); 
const Bottleneck = require("bottleneck");
const redis = require("redis");

const client = redis.createClient({
    url: process.env.REDIS_URL,
    socket: {
        tls: true,  
        rejectUnauthorized: false
    }
});

const limiter = new Bottleneck({
    minTime: 15000 // 15 seconds between requests (arXiv's rule)
});

const fetchArxivPapers = async (userInput) => {
    return limiter.schedule(async () => {
    try {    

        if (!client.isOpen) {
            console.log("reconnecting redis");
            await client.connect();
        }

        const cachedData = await client.get(userInput);
        if(cachedData){
            console.log("Serving from cache");
            return JSON.parse(cachedData) // returning the data in our cache
        }

        const url = `http://export.arxiv.org/api/query?search_query=${encodeURIComponent(userInput)}&start=0&max_results=10`;

        const { data } = await axios.get(url);
        const parser = new xml2js.Parser({ explicitArray: false });
        
        const result = await parser.parseStringPromise(data);
        const entries = result.feed.entry || [];

        console.log("Fetching from arXiv...");
        let papers = entries.map((entry) => ({
            title: entry.title,  
            keywords: "", 
            link: entry.id,    
            topic: "General", 
            source: "arXiv",
            category: "web3" 
        })); 
        
        await client.setEx(userInput, JSON.stringify(papers)); // storing new requests (papers) in redis for 15 minutes
        console.log("Fetched from arvix and cached");
        return papers;
    } catch (error) {  
        console.error("Error fetching from arXiv API:", error);
        return [];
    }
});  
};

process.on("exit", () => {
    client.quit();
    console.log("Redis client closed");
});   

module.exports = fetchArxivPapers;
