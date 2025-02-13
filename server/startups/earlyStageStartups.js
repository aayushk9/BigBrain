const Parser = require("rss-parser");
const parser = new Parser();

const earlyStartupsData = async() => {
    const feed = await parser.parseURL("https://feeds.feedburner.com/BetaList");
    return feed.items.slice(0,6).map(items => ({
        title: items.title,
        link: items.link
    }))
}

module.exports = earlyStartupsData; 