const researchScraper = require("./web3/researchScraper");

const scrapeArvix = async (userInput) => {
    try {
        let results = [];
                const [research] = await Promise.all([
                    researchScraper(userInput),  
                ]);
  
                results = research.map((item) => ({
                    type: "Research Paper",  
                    title: item.title,  
                    author: Array.isArray(item.authors) ? item.authors.join(", ") : item.authors,
                    link: item.link,
                    source: item.source,
                }));
    
        return results;
    
    } catch (err) {   
        console.error(err);
    }
}



module.exports = scrapeArvix; 
