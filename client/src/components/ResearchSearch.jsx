import { useState } from "react";
import axios from "axios";
import { LogoImage } from "./LogoImage";

export function ResearchSearch() {
    const [userInput, setUserInput] = useState("");
    const [papers, setPapers] = useState("");
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);


    const onSubmit = async (e) => {
        e.preventDefault();

        if (!userInput.trim()) {
            alert("Please enter a query");
            return;
        }

        setLoading(true);
        setSearched(true);
        setPapers("");

        const userData = {
            userInput
        }

        console.log(userData);

        try {
            const res = await axios.post("https://bigbrain-an4r.onrender.com/research-papers", userData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log("Response: ", res.data);
            res.data.papers
            setPapers(res.data.papers);
        } catch (error) {
            alert("some error occured")
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-black p-6 w-full">
            <LogoImage />

            {/* Search Bar */}
            <form
                onSubmit={onSubmit}
                className="flex w-full max-w-xl items-center bg-black p-2 rounded-md shadow-md mt-10"
            >
                <input
                    type="text"
                    value={userInput}
                    placeholder="search research, whitepapers"
                    onChange={(e) => setUserInput(e.target.value)}
                    className="flex-1 p-2 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                />
                <button
                    type="submit"
                    className="px-4 py-2 text-white font-semibold bg-black rounded-md text-lg shadow-md hover:bg-gray-800 transition duration-200 flex items-center gap-2 group"
                >
                    Search
                </button>
            </form>

            <div className="mt-6 w-full max-w-xl">
                {loading && (
                    <div className="flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-gray-400 border-t-white rounded-full animate-spin"></div>
                        <p className="text-white ml-3">Searching...</p>
                    </div>
                )}

                {searched && !loading && papers.length === 0 && (
                    <p className="text-gray-400 text-center mt-4">No results found</p>
                )}

                {searched && !loading && papers.length > 0 && papers.map((paper, index) => (
                    <div
                        key={index}
                        className="p-4 bg-black rounded-lg shadow-md flex justify-between items-center mb-2"
                    >
                        <a
                            href={paper.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:underline"
                        >
                            {paper.title}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}  