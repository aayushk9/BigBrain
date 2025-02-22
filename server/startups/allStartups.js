const yc = require("./yc");
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

const startUpNews = async () => {
    try {

        const cacheKey = "startup_news"

        if (!client.isOpen) {
            console.log("reconnecting to redis");
            await client.connect();
        }

        const cachedNews = await client.get(cacheKey);

        if (cachedNews) {
            console.log("serving from cache");
            return JSON.parse(cachedNews);
        }

        const [aiStartup, forFounders, earlyStartups, saas, ycombinator] = await Promise.all([
            AIStartups(),
            founders(),
            earlyStage(),
            saastr(),
            yc(),
        ])

        const allNews = [...aiStartup, ...forFounders, ...earlyStartups, ...saas, ...ycombinator]
        await client.setEx(cacheKey, 600, JSON.stringify(allNews));
        return allNews;
    } catch (error) {
        console.error("getting error: ", error)
    }
}

module.exports = startUpNews;