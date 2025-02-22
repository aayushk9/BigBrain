import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Context } from './components/Context';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Research } from './components/Research';
import { CryptoNews } from './components/CryptoNews';
import { Startups } from './components/Startups';
import { Navbar } from './components/Navbar';
import { ResearchSearch } from './components/ResearchSearch';
import { CryptoLists } from "./components/CryptoLists";
import { StartupsData } from "./components/StartupsData";


function App() {
  return (
    <div className="bg-black min-h-screen w-full">
      <BrowserRouter> 
        <Routes>      
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/research/search" element={<ResearchSearch />} />
          <Route path="/cryptonews" element={<CryptoLists />} />
          <Route path="/startupnews" element={<StartupsData />} />

          <Route
            path="/"
            element={
              <>

                <Navbar />
                <div className="flex flex-col items-center justify-start min-h-screen mt-0 mr-8 ml-8 -translate-y-4 ">
                  <Context />
                  <div className="flex flex-row gap-4 ">
                    <CryptoNews />   
                    <Research />
                    <Startups />
                  </div>
                </div>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App       
