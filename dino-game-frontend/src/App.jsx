import NFTGallery from "./components/NFTGallery";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import YourCharacters from "./components/YourCharacters";
import GamePage from "./components/GamePage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/GamePage' element={<GamePage />} />
          <Route path='/buy' element={<NFTGallery />} />
          <Route path='/yourCharacters' element={<YourCharacters />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
