const Parser = require("rss-parser");
const parser = new Parser();

const articles = async() => {
    const feed = await parser.parseURL("https://www.saastr.com/feed/");
    return feed.items.slice(0,6).map(items => ({
        title: items.title,
        link: items.link
    }))
}

module.exports = articles;  