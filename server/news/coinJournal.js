const Parser = require("rss-parser");
const parser = new Parser({
    timeout: 5000 
});

const coinJournalNews = async() => {
    try{
        const feed = await parser.parseURL("https://coinjournal.net/feed/");
        return feed.items.slice(0, 6).map(item => ({
            title: item.title,
            link: item.link  
        }));
    } catch(err){
        console.error(err);
        return [];
    } 
}
   
module.exports = coinJournalNews;