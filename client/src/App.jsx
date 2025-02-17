import './App.css'
import { Navbar } from './components/Navbar'
import { Context } from './components/Context';
import { Research } from './components/Research';
import { CryptoNews } from './components/CryptoNew';   
import { Startups } from './components/Startups';

function App() {
    return (
          <>
            <Navbar />  {/** in navbar login and signup route need dynamic action */}
            <Context />  
            <Research /> {/**in research section when user clicks on research button**/}
            <CryptoNews />
            <Startups />
          </>
    )
}

export default App  
