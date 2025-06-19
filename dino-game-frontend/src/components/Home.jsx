import React from 'react';
import Navbar from './Navbar';
import './Home.css';
import { Footer } from './Footer';

const Home = () => {
    return (
        <>
            <Navbar />
            <div className="home-min-h-screen home-bg-gray-900 home-text-gray-100 home-font-sans">
                <section className="home-hero-section">
                    <div className="home-hero-content">
                        <h1 className="home-hero-title">
                            Endless Runner – Web3 Gaming with Real Rewards!
                        </h1>
                        <button className="home-play-button" onClick={() => alert('Launching Game!')}>
                            Play Now
                        </button>
                    </div>
                </section>

                <main className="home-h-container home-my-10 home-px-4">
                    {/* Game Functionality and Features Section */}
                    <section className="home-section">
                        <h2 className="home-section-title">Game Features & Rewards</h2>
                        <div className="home-grid-container">
                            <div className="home-feature-card">
                                <span className="home-card-icon">🚀</span>
                                <h3 className="home-card-title">Play to Earn</h3>
                                <p className="home-card-description">
                                    Earn Dino Tokens as you play and achieve high scores.
                                    These tokens are your gateway to the Web3 gaming ecosystem.
                                </p>
                            </div>
                            <div className="home-feature-card">
                                <span className="home-card-icon">🔓</span>
                                <h3 className="home-card-title">Unlock NFTs</h3>
                                <p className="home-card-description">
                                    Use your earned Dino Tokens or achieve high scores to unlock
                                    powerful and unique NFT characters.
                                </p>
                            </div>
                            <div className="home-feature-card">
                                <span className="home-card-icon"> 🔗 </span>
                                <h3 className="home-card-title">Decentralized Ecosystem</h3>
                                <p className="home-card-description">
                                    Experience true ownership in a fully decentralized environment where
                                    your assets are truly yours.
                                </p>
                            </div>
                            <div className="home-feature-card">
                                <span className="home-card-icon">🌟</span>
                                <h3 className="home-card-title">Bonus Reward: 500+ Score</h3>
                                <p className="home-card-description">
                                    Score 500+ in a single run to get a free NFT character!
                                </p>
                            </div>
                            <div className="home-feature-card">
                                <span className="home-card-icon">✨</span>
                                <h3 className="home-card-title">Exclusive Reward: 1500+ Score</h3>
                                <p className="home-card-description">
                                    Achieve 1500+ score for an exclusive, more attractive character!
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Why It's Better Section */}
                    <section className="home-section home-bg-gray-800 home-rounded-xl home-shadow-lg">
                        <h2 className="home-section-title">Why It’s Better Than Other Web3 Games</h2>
                        <div className="home-text-left home-max-w-3xl home-mx-auto">
                            <div className="home-list-item">
                                <span className="home-list-icon">✅</span>
                                <p className="home-list-text">
                                    <strong className="home-text-white">Full Ownership</strong> – Your characters (NFTs) are stored in your MetaMask wallet, not controlled by game developers.
                                </p>
                            </div>
                            <div className="home-list-item">
                                <span className="home-list-icon">✅</span>
                                <p className="home-list-text">
                                    <strong className="home-text-white">Trade & Share</strong> – You can sell, trade, or lend your NFTs to friends, letting them use your characters.
                                </p>
                            </div>
                            <div className="home-list-item">
                                <span className="home-list-icon">✅</span>
                                <p className="home-list-text">
                                    <strong className="home-text-white">No Central Control</strong> – Unlike most Web3 games where assets are limited to in-game use, here, you truly own what you buy.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Important Game Info Section */}
                    <section className="home-section">
                        <h2 className="home-section-title">Important Game Info</h2>
                        <div className="home-info-card home-max-w-2xl home-mx-auto">
                            <div className="home-info-item">
                                <p className="home-info-label">Dino Token Address:</p>
                                <p className="home-info-value home-address">0x98ba2bbf253E507E4656b018faD50ceFa74Eb5BC</p>
                            </div>
                            <div className="home-info-item">
                                <p className="home-info-label">NFT Contract Address:</p>
                                <p className="home-info-value home-address">0x70ED1e6e34B4b3D7176E563B67b9A64D628597C9</p>
                            </div>
                            <div className="home-info-item">
                                <p className="home-info-label">Character IDs:</p>
                                <ul className="home-info-value">
                                    <li><strong className="home-text-gray-200">Pokemon:</strong> <span className="home-character-id">1</span></li>
                                    <li className="home-mt-2"><strong className="home-text-gray-200">Takaratomy:</strong> <span className="home-character-id">500</span></li>
                                    <li className="home-mt-2"><strong className="home-text-gray-200">Charizard:</strong> <span className="home-character-id">1500</span></li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
            <Footer />
        </>
    );
};

export default Home;
