const mongoose = require("mongoose");
const { Schema } = mongoose;


const researchSchema = new Schema({
    type: {
        type: String,
        enum: ["Research Paper", "Technical Article", "Whitepaper"],
        required: true
    },   
    title: String,
    abstract: String,   
    keywords: String,
    author: String,
    link: String,
    topic: String,
    source: String,    
    category: {
        type: String,
        enum: ["web3", "startups"],  // Only allow these categories
        required: true
    }
}) 
  
// This tells MongoDB that these fields should be used for efficient text searching
researchSchema.index({title: "text", keywords: "text", topic: "text", abstract: "text"});  

const researchPaper = mongoose.model("ResearchPaper", researchSchema);
module.exports = researchPaper;