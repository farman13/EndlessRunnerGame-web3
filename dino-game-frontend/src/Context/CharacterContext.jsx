import { createContext, useContext, useState } from "react";

const CharacterContext = createContext();


export const CharacterProvider = ({ children }) => {
    const [character, setCharacter] = useState("./dino.avif");

    return (
        <CharacterContext.Provider value={{ character, setCharacter }}>
            {children}
        </CharacterContext.Provider>
    );
};


export const useCharacter = () => useContext(CharacterContext);
