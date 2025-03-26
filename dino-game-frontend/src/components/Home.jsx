import { useState } from "react";
import DinoGame from "./DinoGame";
import Navbar from "./Navbar";
import NFTGallery from "./NFTGallery";

const Home = () => {
    return <>
        <Navbar />
        <DinoGame />
    </>
}

export default Home;