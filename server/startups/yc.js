const Parser = require("rss-parser");
const parser = new Parser();

const articles = async () => {
    const feed = await parser.parseURL("https://www.ycombinator.com/blog/rss");
    return feed.items.slice(0, 6).map(item => ({
        title: item.title,
        link: item.link  
    }));
}

articles().then(data => console.log("data fetched"));

module.exports = articles;