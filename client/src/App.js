import './App.css'
import Landing from './components/Landing/Landing'
import Home from './components/Home/Home'
import NavBar from './components/NavBar/NavBar'
import Recipes from './components/Recipes/Recipes'
import About from './components/About/About'
import Diets from './components/Diets/Diets'
import { Routes, Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom'



function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';


  return (
    <div className="App">
      {!isHomePage && <NavBar />}
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/Home" element={<Home />} />

        <Route path="/Recipes" element={<Recipes />} />

        <Route path="/Diets" element={<Diets />} />

        <Route path="/About" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
