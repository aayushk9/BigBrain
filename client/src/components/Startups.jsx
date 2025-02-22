import { Link } from "react-router-dom"
export function Startups(){

    return(
        <div className="mt-10">
          <Link to="/startupnews">
             <button className="px-6 py-3 text-black font-semibold bg-white rounded-md text-lg shadow-md hover:bg-gray-800 transition duration-200 flex items-center gap-2 group">
                Startup News
             </button>
          </Link>
        </div>
    )
}     