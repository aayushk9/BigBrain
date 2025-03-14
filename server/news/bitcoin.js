const Parser = require("rss-parser");
const parser = new Parser({
    timeout: 5000
});

const bitcoinNews = async() => {
    try {
        const feed = await parser.parseURL('https://bitcoinmagazine.com/.rss/full/')
        return feed.items.slice(0, 15).map(item => ({
            title: item.title,
            link: item.link  
        }));
    } catch(err){
      console.error(err);
      return []  
    }
}

module.exports = bitcoinNews;    