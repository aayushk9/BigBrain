const cointelegraph = require("./coinTelegraphNews");
const coinJournal = require("./coinJournal");

const fetchNews = async() => {
    try{
        const [telegraphNews, journalNews] = await Promise.all([
            cointelegraph(),
            coinJournal()
         ])
     
         return [...telegraphNews, ...journalNews]
    }  catch(err){
        console.error(err);
    }
}
module.exports = fetchNews;