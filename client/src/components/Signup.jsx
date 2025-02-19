import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
            const res = await axios.post("http://localhost:3000/signup", signupData, {
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
                alert("Error: ", res.data.msg)
            }
        } catch (err) {
            console.log("Some error occured")
        }

    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => { setUsername(e.target.value) }}
                />
                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                />

                <button type="submit">Signup</button>
            </form>
        </div>
    )
}
