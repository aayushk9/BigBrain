import { CryptoNews } from "./CryptoNews"
import { Startups } from "./Startups"
import { useState } from "react";
import axios from "axios";

export function ResearchSearch(){
    const [userInput, setUserInput] = useState("");
    const [papers, setPapers] = useState("");
    const [error, setError] = useState("");


    const onSubmit = async (e) => {
        e.preventDefault();
 
        const userData = {
            userInput
        }

        console.log(userData);

        try{
            const res = await axios.post("http://localhost:3000/research-papers", userData, {
                headers : {
                    "Content-Type": "application/json"
                }
            })   
            console.log("Response: " , res.data);
            res.data.papers
            setPapers(res.data.papers);
        } catch(error){
            alert("some error occured")
        }
    }  

    return (
        <div>

            <form onSubmit={onSubmit}>
                <CryptoNews />
                <Startups /> 
                <input
                    type="text"
                    value={userInput}
                    placeholder="type"
                    onChange={(e) => { setUserInput(e.target.value) }}
                />

                <button type="submit">Search</button>
            </form>

            <div>
              {papers.length > 0 ? (
                  <ul>            
                    {papers.map((papers, index) => (
                    <li key={index}>{papers.title}, {papers.link}</li>  
                    ))}
                  </ul>
              ) : (
               <p>No papers found</p>             
              )}
            </div>
        </div>
    )
}  