const axios = require("axios");
const xml2js = require("xml2js"); // Convert XML response to JSON

const fetchArxivPapers = async (userInput) => {
    try {
        const url = `http://export.arxiv.org/api/query?search_query=${encodeURIComponent(userInput)}&start=0&max_results=10`;

        const { data } = await axios.get(url);
        const parser = new xml2js.Parser({ explicitArray: false });
        
        const result = await parser.parseStringPromise(data);
        const entries = result.feed.entry || [];

        let papers = entries.map((entry) => ({
            title: entry.title,
            abstract: entry.summary,
            authors: Array.isArray(entry.author) 
                ? entry.author.map(a => a.name) 
                : [entry.author.name],  // Handle single/multiple authors
            link: entry.id,    
            source: "arXiv"
        }));

        return papers;
    } catch (error) {
        console.error("Error fetching from arXiv API:", error);
        return [];
    }
};

module.exports = fetchArxivPapers;
