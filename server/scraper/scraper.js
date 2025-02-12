const researchScraper = require("./web3/researchScraper");

const scrapeAll = async (category, userInput) => {
    try {
        let results = [];

        if (category == "web3") {  
                const [research] = await Promise.all([
                    researchScraper(userInput),  
                ]);
  
                results = research.map((item) => ({
                    type: "Research Paper",  
                    title: item.title || "Unknown Title",
                    abstract: item.abstract || "No abstract available",
                    keywords: item.keywords || "", 
                    author: Array.isArray(item.authors) ? item.authors.join(", ") : item.authors || "Unknown Author",
                    link: item.link || "#",
                    topic: item.topic || "General", 
                    source: item.source || "Unknown",
                    category: category
                }));
    
        } else if (category == "startups") {
            const [eg0, eg1, eg2] = await Promise.all([
                // scrapers
            ])
            results = [
                ...eg0.map((item) => ({ ...item, type: "eg0" })),
                ...eg1.map((item) => ({ ...item, type: "eg1" })),
                ...eg2.map((item) => ({ ...item, type: "eg2" }))
            ]
        } else {
            return res.json({
                msg: "No data found"
            })
        }
        return results;

    } catch (err) {   
        console.error(err);
    }
}


module.exports = scrapeAll; 

