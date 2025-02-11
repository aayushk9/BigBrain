const researchScraper = require("./web3/researchScraper");
const technicalPaperScraper = require("./web3/technicalScraper");

const scrapeAll = async (category, userInput) => {
    try {
        let results = [];

        if (category == "web3") {
            const [research,technical] = await Promise.all([
                researchScraper(userInput),  
                //technicalPaperScraper(userInput)
            ]);

            results = [
                ...research.map((item) => ({ ...item, type: "Research paper" }))
                //...technical.map((item) => ({ ...item, type: "Technical articles" }))
            ]

        } else if (category == "startups") {
            const [research, eg1, eg2] = await Promise.all([
                // scrapers
            ])
            results = [
                ...research.map((item) => ({ ...item, type: "Research" })),
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

