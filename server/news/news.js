const redis = require("redis")
const cointelegraph = require("./coinTelegraphNews");
const coinJournal = require("./coinJournal");
const bitcoin = require("./bitcoin");
const cryptoSlate = require("./cryptoslate")

const client = redis.createClient({
    url: process.env.REDIS_URL,
    socket: {
        tls: true,
        rejectUnauthorized: false
    }

})

const fetchNews = async () => {
    try {

        const cacheKey = "crypto_news";

        if (!client.isOpen) {
            console.log("reconnecting redis");
            await client.connect()
        }

        const cachedNews = await client.get(cacheKey);

        if (cachedNews) {
            console.log("Serving crypto news from cache");
            return JSON.parse(cachedNews)
        }

        const [telegraphNews, bitcoinNews, cryptoSlateNews, journalNews] = await Promise.all([
            cointelegraph(),
            bitcoin(),
            cryptoSlate(),
            coinJournal()
        ])

        const allNews = [...telegraphNews, ...bitcoinNews, ...cryptoSlateNews, ...journalNews,]
        await client.setEx(cacheKey, 600, JSON.stringify(allNews));
        return allNews;

    } catch (err) {
        console.error(err);
    }
}

module.exports = fetchNews;