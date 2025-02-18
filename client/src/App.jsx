import {Routes, Route, BrowserRouter } from "react-router-dom";
import { Context } from './components/Context';  
import { Login } from './components/Login';
import {Signup} from './components/Signup';
import {Research} from './components/Research';
import {CryptoNews} from './components/CryptoNews';
import { Startups } from './components/Startups';
import { Navbar } from './components/Navbar';
import {ResearchSearch} from './components/ResearchSearch';
import { CryptoLists } from "./components/CryptoLists";
import { StartupsData } from "./components/StartupsData";

function App() {
  return (  
    <BrowserRouter>
    <img src="/logo.png" alt="logo"/>
    

    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/research/search" element ={<ResearchSearch/>}/>
      <Route path="/cryptonews" element={<CryptoLists/>}/>
      <Route path="/startupnews" element = {<StartupsData/>}/>

      <Route
        path="/"
        element={
          <>
            <Navbar/>
            <Context />
            <Research />    
            <CryptoNews />
            <Startups />   
          </>  
        }
      />
    </Routes>
  </BrowserRouter>
  
  )
}

export default App  
