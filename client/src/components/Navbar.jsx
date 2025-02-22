import { Link } from "react-router-dom"
import { useState } from "react";


export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="flex items-center justify-between px-4 py-4 bg-black">
            <div className="flex items-center">
                <a href="/">
                    <img src="/logo.png" alt="logo" className="h-10 w-auto cursor-pointer" />
                </a>
            </div>  


            <button 
                className="md:hidden text-white text-2xl focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}  
            >
                ☰
            </button>

            <ul className={`absolute top-16 right-4 bg-black p-4 rounded-lg shadow-lg space-y-2 ${isOpen ? "block" : "hidden"} md:flex md:space-x-4 md:static md:p-0 md:bg-transparent md:shadow-none md:space-y-0`}>
                <li className="px-6  text-white font-semibold bg-black rounded-md text-lg shadow-md hover:bg-gray-800 transition duration-200 flex items-center gap-2 group">
                    <Link to="/login">Login</Link>
                </li>
                <li className="px-6 py-3 text-white font-semibold bg-black rounded-md text-lg shadow-md hover:bg-gray-800 transition duration-200 flex items-center gap-2 group">
                    <Link to="/signup">Signup</Link>
                </li>
            </ul>
        </nav>
    );
}
