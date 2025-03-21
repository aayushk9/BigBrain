const Parser = require("rss-parser");
const parser = new Parser({
    timeout: 5000
});

const articles = async () => {
    const feed = await parser.parseURL("https://www.ycombinator.com/blog/rss");
    return feed.items.slice(0, 4).map(item => ({
        title: item.title,
        link: item.link  
    }));
}

articles().then(data => console.log("data fetched"));