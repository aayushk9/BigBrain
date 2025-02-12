const Parser = require("rss-parser");
const parser = new Parser();

const coinJournalNews = async() => {
    try{
        const feed = await parser.parseURL("https://coinjournal.net/feed/");
        return feed.items.slice(0,5);
    } catch(err){
        console.error(err);
        return [];
    } 
}
   
module.exports = coinJournalNews;