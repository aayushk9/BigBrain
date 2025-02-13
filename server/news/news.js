const cointelegraph = require("./coinTelegraphNews");
const coinJournal = require("./coinJournal");
const bitcoin = require("./bitcoin");
const cryptoSlate = require("./cryptoslate")

const fetchNews = async() => {
    try{
        const [telegraphNews, journalNews, bitcoinNews, cryptoSlateNews] = await Promise.all([
            cointelegraph(),
            coinJournal(),
            bitcoin(),
            cryptoSlate()
         ])
     
         return [...telegraphNews, ...journalNews, ...bitcoinNews, ...cryptoSlateNews]
    }  catch(err){
        console.error(err);
    }
}

module.exports = fetchNews;