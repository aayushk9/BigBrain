const Parser = require("rss-parser");
const parser = new Parser({
    timeout: 5000
});

const earlyStartupsData = async() => {
    const feed = await parser.parseURL("https://feeds.feedburner.com/BetaList");
    return feed.items.slice(0,12).map(items => ({
        title: items.title,
        link: items.link
    }))
}

module.exports = earlyStartupsData; 