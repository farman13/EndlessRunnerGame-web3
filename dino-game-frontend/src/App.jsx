import React from "react";
import DinoGame from "./components/DinoGame";
import NFTGallery from "./components/NFTGallery";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import YourCharacters from "./components/YourCharacters";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/buy' element={<NFTGallery />} />
          <Route path='/yourCharacters' element={<YourCharacters />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
