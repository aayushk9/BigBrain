import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LogoImage } from "./LogoImage";

export function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const onSubmit = async (e) => {
        e.preventDefault();

        const signupData = {
            username,
            password
        }  
        console.log(signupData);
        try {
            const res = await axios.post("https://bigbrain-an4r.onrender.com/signup", signupData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            console.log(res.data);
            if (res.data.token) {
                console.log(res.data.token)
                localStorage.setItem("token: ", res.data.token)
                navigate("/research/search");
            } else {
                console.log(res.data.msg + "dnfnnn")
                alert(res.data.msg)
            }
        } catch (err) {
            console.log("Some error occured")
        }

    }

    return (
        <div className="flex justify-center items-center h-screen">
            <LogoImage />
            <form onSubmit={onSubmit}
                className="bg-black p-6 rounded-lg shadow-lg flex flex-col gap-4 w-80"
            >
                <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => { setUsername(e.target.value) }}
                    className="p-3 text-white bg-black border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                    className="p-3 text-white bg-black border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button className="px-3 py-2 text-white font-semibold bg-black rounded-md text-lg shadow-md hover:bg-gray-800 hover:text-white transition duration-200 flex items-center justify-center" type="submit">Signup</button>
            </form>
        </div>
    )
}
