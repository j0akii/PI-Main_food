import './App.css'
import Landing from './components/Landing/Landing'
import Home from './components/Home/Home'
import NavBar from './components/NavBar/NavBar'
import Recipes from './components/Recipes/Recipes'
import About from './components/About/About'
import Diets from './components/Diets/Diets'
import Footer from './components/Footer/Footer'
import Detail from "./components/Detail/Detail"
import Form from "./components/Form/Form"
import PopUp from "./components/PopUp/PopUp";
import { Routes, Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'


function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isCreated, setIsCreated] = useState(false);

  const handlePopOff = () => {
    setIsCreated(false);
  };


  return (
    <div className='App'>
      {!isHomePage && <NavBar />}
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/Home" element={<Home />} />

        <Route path="/Recipes" element={<Recipes />} />

        <Route path="/Recipes/Detail/:id" element={<Detail />} />

        <Route path="/Diets" element={<Diets />} />

        <Route path="/About" element={<About />} />

        <Route
          path="/Recipes/Form"
          element={<Form setIsCreated={setIsCreated} isCreated={isCreated} />}
        />
      </Routes>
      {!isHomePage && <Footer isCreated={isCreated} />}
      {isCreated === true && <PopUp onClose={handlePopOff} />}
    </div>
  );
}

export default App;
