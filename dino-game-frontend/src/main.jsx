import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Config } from './Config.jsx'
import { CharacterProvider } from "./Context/CharacterContext.jsx";

createRoot(document.getElementById('root')).render(

  <Config>
    <CharacterProvider>
      <App />
    </CharacterProvider>
  </Config>
  ,
)
