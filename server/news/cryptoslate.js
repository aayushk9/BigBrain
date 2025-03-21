const Parser = require("rss-parser");
const parser = new Parser({
    timeout: 5000
});

const cryptoSlateNews = async() => {
    try {
        const feed = await parser.parseURL('https://cryptoslate.com/feed/')
        return feed.items.slice(0, 10).map(item => ({
            title: item.title,
            link: item.link  
        }));
    } catch(err){
      console.error(err);
      return []  
    }
}    