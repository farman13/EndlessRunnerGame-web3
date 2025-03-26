import React, { useEffect, useRef, useState } from "react";
import { useAccount } from "wagmi";
import { useCharacter } from "../Context/CharacterContext";
import axios from 'axios';

const DinoGame = () => {
    const canvasRef = useRef(null);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false); // New state for game start
    const isJumping = useRef(false);
    const dinoY = useRef(250);
    const velocity = useRef(0);
    const gravity = 0.6;
    let obstacles = [];

    const { isConnected, address } = useAccount();
    const { character } = useCharacter();

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
            ctx.drawImage(dinoImg, 50, dinoY.current, 50, 50);
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
    };

    const startGame = () => {
        setGameStarted(true); // Start the game
        restartGame(); // Reset the game state
    };

    const handleAirdrop = async (score) => {
        console.log("airdrop");
        if (score < 100) {
            return;
        }
        else {

            const amount = score / 100;
            const dinoResponse = await airdropDinoToken(amount);

            if (score > 200) {
                await airdropNFT();
            }
        }

    }

    const airdropDinoToken = async (amount) => {

        console.log("airdrop token :", amount)

        const response = await axios.post("http://localhost:3000/airdropDino", {
            address,
            amount
        });
        console.log(response.data);
        return response.data;
    }

    const airdropNFT = async () => {
        const response = await axios.post("http://localhost:3000/airdropNFT", {
            address
        });
        console.log(response.data);
    }

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Dino Game</h1>
            <canvas ref={canvasRef} width={800} height={300} style={{ border: "1px solid black" }}></canvas>
            <p>Score: {score}</p>
            {isConnected && !gameStarted && <button onClick={startGame}>Start Game</button>} {/* Start Game button */}
            {gameOver && <button onClick={restartGame}>Restart</button>}
            <p>Press Spacebar to Jump</p>
        </div>
    );
};

export default DinoGame;
