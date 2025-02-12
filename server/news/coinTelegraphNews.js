const Parser = require("rss-parser");
const parser = new Parser();

const coinTelegraphNews = async() => {
    try {
        const feed = await parser.parseURL('https://cointelegraph.com/rss')
        return feed.items.slice(0,5);
    } catch(err){
      console.error(err);
      return []  
    }
}

module.exports = coinTelegraphNews;    