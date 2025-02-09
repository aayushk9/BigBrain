const mongoose = require("mongoose");
const { Schema } = mongoose;


const researchSchema = new Schema({
    title: String,
    abstract: String,
    keywords: String,
    author: String,
    link: String,
    topic: String,
    source: String,  
    publishedDate: Date
}) 

const ResearchPaper = mongoose.model("ResearchPaper", researchSchema);
module.exports = ResearchPaper;