const Parser = require("rss-parser");
const parser = new Parser();


const fetchAIStartups = async () => {
    const feed = await parser.parseURL("https://venturebeat.com/category/ai/feed/");
    return feed.items.slice(0,12).map(items => ({
        title: items.title,
        link: items.link
    }))
}

module.exports = fetchAIStartups;