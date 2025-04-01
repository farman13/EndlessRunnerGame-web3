import React from "react";
import NFTGallery from "./components/NFTGallery";
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
