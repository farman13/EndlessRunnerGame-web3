import React, { useEffect, useRef, useState } from "react";
import { useAccount } from "wagmi";
import { useCharacter } from "../Context/CharacterContext";
import axios from 'axios';
import { useTokenBalance } from "../hooks/useTokenBalance";

const DinoGame = () => {
    const canvasRef = useRef(null);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false); // New state for game start
    const [showPopup, setShowPopup] = useState(false);
    const isJumping = useRef(false);
    const dinoY = useRef(250);
    const velocity = useRef(0);
    const gravity = 0.6;
    let obstacles = [];

    const { isConnected, address } = useAccount();
    const { character } = useCharacter();
    const { balance, isLoading, isError, refetchBalance } = useTokenBalance();

    useEffect(() => {

        if (!gameStarted) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animationFrame;
        let gameSpeed = 5;

        const treeImg = new Image();
        treeImg.src = "/cactusTree.jpg";
        treeImg.onload = () => console.log("Cactus image loaded successfully!");

        const spawnObstacle = () => {
            obstacles.push({ x: 800, y: 220, width: 50, height: 80 });
        };

        const randomSpawn = () => {
            spawnObstacle();
            setTimeout(randomSpawn, Math.random() * (3000 - 1500) + 1500);
        };
        randomSpawn();

        const updateGame = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw Dino
            const dinoImg = new Image();
            dinoImg.src = character;
            dinoImg.onload = () => console.log("Dino image loaded successfully!");

            // Draw Dino
            ctx.drawImage(dinoImg, 50, dinoY.current, 65, 50);
            // Gravity Effect
            dinoY.current += velocity.current;
            velocity.current += gravity;
            if (dinoY.current >= 250) {
                dinoY.current = 250;
                velocity.current = 0;
                isJumping.current = false;
            }

            // Move Obstacles
            obstacles.forEach((ob) => {
                ob.x -= gameSpeed;
                ctx.fillStyle = "red";
                ctx.drawImage(treeImg, ob.x, ob.y, ob.width, ob.height);

                // Collision Detection
                if (
                    50 < ob.x + ob.width &&
                    50 + 40 > ob.x &&
                    dinoY.current < ob.y + ob.height &&
                    dinoY.current + 40 > ob.y
                ) {
                    setGameOver(true);
                    cancelAnimationFrame(animationFrame);
                }
            });

            setScore((prev) => prev + 1);
            animationFrame = requestAnimationFrame(updateGame);
        };

        if (!gameOver) {
            updateGame();
        }

        return () => {
            cancelAnimationFrame(animationFrame);
        };
    }, [gameOver, gameStarted]);

    useEffect(() => {
        if (gameOver) {
            console.log("Final Score (After Update):", score);
            handleAirdrop(score);
        }

    }, [gameOver, score]);

    const handleJump = () => {
        if (!isJumping.current) {
            velocity.current = -16;
            isJumping.current = true;
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.code === "Space") {
                handleJump();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const restartGame = () => {
        setGameOver(false);
        setScore(0);
        obstacles = [];
        isJumping.current = false;
        dinoY.current = 0;
        velocity.current = 0;

        refetchBalance();
    };

    const startGame = () => {
        setGameStarted(true); // Start the game
        restartGame(); // Reset the game state
        refetchBalance();
    };

    const handleAirdrop = async (score) => {
        console.log("airdrop");
        if (score < 100) {
            return;
        }
        else {
            const amount = score / 100;
            if (score > 1500) {
                alert(`You got ${amount} dino tokens and You got a NFT ! Sending it your way now!🚀🎉`)
                const dinoResponse = await airdropDinoToken(amount);
                console.log("Dino Airdrop Hash:", dinoResponse.txHash);
                await airdropNFT(1500);
            }
            else if (score > 500) {
                alert(`You got ${amount} dino tokens and You got a NFT ! Sending it your way now!🚀🎉`)
                const dinoResponse = await airdropDinoToken(amount);
                console.log("Dino Airdrop Hash:", dinoResponse.txHash);
                await airdropNFT(500);
            }
            else {
                alert(`You got ${amount} dino tokens 🚀🎉`)
                const dinoResponse = await airdropDinoToken(amount);
                console.log("Dino Airdrop Hash:", dinoResponse.txHash);
            }
        }

    }

    const airdropDinoToken = async (amount) => {

        console.log("airdrop token :", amount)

        const response = await axios.post("https://endless-runner-game-web3.vercel.app/airdropDino", {
            address,
            amount
        });
        console.log(response.data);
        return response.data;
    }

    const airdropNFT = async (id) => {
        const response = await axios.post("https://endless-runner-game-web3.vercel.app/airdropNFT", {
            address,
            id
        });
        console.log("NFT", response.data);

        setShowPopup(true);

        setTimeout(() => {
            setShowPopup(false);
        }, 3000);
    }

    return (
        <div style={{ textAlign: "center", position: "relative" }}>
            <h2>Dino Game</h2>
            {address &&
                <div style={{
                    position: "absolute",
                    top: "5px",
                    left: "10px",
                    backgroundColor: "#000",
                    color: "#fff",
                    padding: "2px 8px",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontWeight: "bold"
                }}>

                    <p>Balance: {isLoading ? "Loading..." : isError ? "Error" : `${balance} Tokens`}</p>
                </div>
            }
            <canvas ref={canvasRef} width={800} height={300} style={{ border: "1px solid black" }}></canvas>
            <p>Score: {score}</p>
            {isConnected && !gameStarted ? <div><button onClick={startGame}>Start Game</button>
                <p>Press Spacebar to Jump</p></div>
                : <h2>Please Connect your wallet to start the game !</h2>
            } {/* Start Game button */}
            {gameOver && <button onClick={restartGame}>Restart</button>}

            {showPopup && (
                <div style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                    textAlign: "center",
                    zIndex: 1000,
                    background: "black",
                    color: "white"
                }}>
                    <h3>Congratulations!</h3>
                    <p>You reached 1000 score and received a free NFT! 🎉</p>
                </div>
            )}
        </div>

    );
};

export default DinoGame;
