import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div
                style={{
                    minHeight: "100vh",
                    backgroundColor: "#0d1b2a",
                    color: "#f1f1f1",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "2rem",
                }}
            >
                <div style={{ maxWidth: "800px", width: "100%" }}>
                    <h1 style={{ fontSize: "2.8rem", color: "#fca311", textAlign: "center", marginBottom: "1rem" }}>
                        🦖 Endless Runner – Web3 Gaming with Real Rewards!
                    </h1>
                    <p style={{ fontSize: "1.2rem", color: "#e0e1dd", textAlign: "center", marginBottom: "2rem" }}>
                        Play to earn <strong>Dino Tokens</strong> and unlock powerful NFT characters in a fully decentralized, player-owned ecosystem.
                    </p>

                    {/* Bonus Rewards */}
                    <div
                        style={{
                            backgroundColor: "#1b263b",
                            padding: "1rem 1.5rem",
                            borderRadius: "12px",
                            marginBottom: "1.5rem",
                        }}
                    >
                        <h2 style={{ color: "#fca311" }}>🔥 Bonus Rewards</h2>
                        <ul style={{ paddingLeft: "1.2rem", color: "#e0e1dd" }}>
                            <li>🎯 Score <strong>500+</strong> → Free NFT character</li>
                            <li>🏆 Score <strong>1500+</strong> → Exclusive, more attractive NFT</li>
                        </ul>
                    </div>

                    {/* Why Choose Us */}
                    <div
                        style={{
                            backgroundColor: "#1e293b",
                            padding: "1rem 1.5rem",
                            borderRadius: "12px",
                            marginBottom: "1.5rem",
                        }}
                    >
                        <h2 style={{ color: "#4cc9f0" }}>💡 Why It’s Better?</h2>
                        <ul style={{ paddingLeft: "1.2rem", color: "#f1f1f1" }}>
                            <li>✅ <strong>Full Ownership</strong> – NFTs are in your MetaMask</li>
                            <li>✅ <strong>Trade & Share</strong> – Sell, lend or gift your characters</li>
                            <li>✅ <strong>No Central Control</strong> – You fully own your assets</li>
                        </ul>
                    </div>

                    {/* Features */}
                    <div
                        style={{
                            backgroundColor: "#14213d",
                            padding: "1rem 1.5rem",
                            borderRadius: "12px",
                            marginBottom: "1.5rem",
                        }}
                    >
                        <h2 style={{ color: "#ffbe0b" }}>🎮 Game Features</h2>
                        <ul style={{ paddingLeft: "1.2rem", color: "#ffffff" }}>
                            <li>🏃‍♂️ Endless running action</li>
                            <li>🦖 Earn Dino Tokens while playing</li>
                            <li>🛒 Spend tokens on new NFT characters</li>
                        </ul>
                    </div>

                    {/* Contract Info */}
                    <div
                        style={{
                            backgroundColor: "#1a1a2e",
                            padding: "1rem 1.5rem",
                            borderRadius: "12px",
                            marginBottom: "2rem",
                            border: "1px solid #2c2c54",
                        }}
                    >
                        <h3 style={{ color: "#00f5d4" }}>📦 Token & NFT Info</h3>
                        <p><strong>Dino Token:</strong> <code style={{ color: "#adf7b6" }}>0x98ba2bbf253E507E4656b018faD50ceFa74Eb5BC</code></p>
                        <p><strong>NFT Contract:</strong> <code style={{ color: "#adf7b6" }}>0x70ED1e6e34B4b3D7176E563B67b9A64D628597C6</code></p>
                        <p><strong>Character IDs:</strong></p>
                        <ul style={{ paddingLeft: "1.2rem" }}>
                            <li>Pokemon: <code style={{ color: "#ffcad4" }}>1</code></li>
                            <li>Takaratomy: <code style={{ color: "#ffcad4" }}>500</code></li>
                            <li>Charizard: <code style={{ color: "#ffcad4" }}>1500</code></li>
                        </ul>
                    </div>

                    {/* CTA Button */}
                    <div style={{ textAlign: "center" }}>
                        <button
                            onClick={() => navigate("/GamePage")}
                            style={{
                                padding: "0.8rem 2rem",
                                fontSize: "1.1rem",
                                backgroundColor: "#00b4d8",
                                color: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                                transition: "background-color 0.3s",
                            }}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0077b6")}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = "#00b4d8")}
                        >
                            🚀 Play Now
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
