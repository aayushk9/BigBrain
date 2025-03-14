const saastr = require("./saastr");
const earlyStage = require("./earlyStageStartups");
const AIStartups = require("./aiStartups");
const founders = require("./founders");
const redis = require("redis");

const client = redis.createClient({
    url: process.env.REDIS_URL,
    socket: {
        tls: true,
        rejectUnauthorized: false
    }
});

client.connect().catch(console.error);

const startUpNews = async () => {
    try {

        const cacheKey = "startup_news"
        const cachedNews = await client.get(cacheKey);

        if (cachedNews) {
            console.log("serving from cache");
            return JSON.parse(cachedNews);
        }

        const [aiStartup, forFounders, earlyStartups, saas] = await Promise.all([
            AIStartups(),
            founders(),
            earlyStage(),
            saastr(),
        ])

        const allNews = [...aiStartup, ...forFounders, ...earlyStartups, ...saas]
        await client.setEx(cacheKey, 600, JSON.stringify(allNews));
        return allNews;

    } catch (error) {
        console.error("getting error: ", error)
    }
}

module.exports = startUpNews;