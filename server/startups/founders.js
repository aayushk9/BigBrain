const Parser = require("rss-parser");
const parser = new Parser();

const founders = async() => {
    const feed = await parser.parseURL("https://www.entrepreneur.com/latest.rss");
    return feed.items.slice(0,10).map(items => ({
        title: items.title,
        link: items.link
    }))
}

module.exports = founders; 