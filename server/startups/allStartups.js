const yc = require("./yc");
const saastr = require("./saastr");
const earlyStage = require("./earlyStageStartups");
const AIStartups = require("./aiStartups");
const founders = require("./founders");

const startUpNews = async () => {
    try{
        const [ycombinator, saas, earlyStartups, aiStartup, forFounders] = await Promise.all([
            yc(),
            saastr(),
            earlyStage(),
            AIStartups(),
            founders()
        ])   

        return [...ycombinator, ...saas, ...earlyStartups, ...aiStartup, ...forFounders]  
    } catch(error){
      console.error("getting error: " ,error)
    } 
}

module.exports = startUpNews;