import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      username,
      password
    }   

    console.log(loginData);
    try {

      const res = await axios.post("http://localhost:3000/login", loginData, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      console.log(res.data);
      if (res.data.token) {
        console.log(res.data.token)
        localStorage.setItem("token: ", res.data.token)
        navigate("/research/search")
      } else {
        alert("Error: ", res.data.mgs)
      }
    } catch (err) {
      console.error("login error: ", err);
    }

  }

  return (
    <div>
      <form onSubmit={onSubmit}>

        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

      </form>
    </div>
  )
} 
