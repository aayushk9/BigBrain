const redis = require("redis")
const cointelegraph = require("./coinTelegraphNews");
const coinJournal = require("./coinJournal");
const bitcoin = require("./bitcoin");

const client = redis.createClient({
    url: process.env.REDIS_URL,
    socket: {
        tls: true,
        rejectUnauthorized: false
    }

})

client.connect().catch(console.error);

const fetchNews = async () => {
    try {
        const cacheKey = "crypto_news";
        const cachedNews = await client.get(cacheKey);

        if (cachedNews) {
            console.log("Serving crypto news from cache");
            return JSON.parse(cachedNews)
        }

        const [telegraphNews, bitcoinNews, journalNews] = await Promise.all([
            cointelegraph(),
            bitcoin(),
            coinJournal()
        ])

        const allNews = [...telegraphNews, ...bitcoinNews, ...journalNews,]
        await client.setEx(cacheKey, 600, JSON.stringify(allNews));
        return allNews;

    } catch (err) {
        console.error(err);
    }
}

module.exports = fetchNews;  