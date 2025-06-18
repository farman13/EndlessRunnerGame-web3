import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import dinoImg from "../../public/dino-black.jpg"

const Navbar = () => {
    return (
        <nav
            style={{
                backgroundColor: "rgb(14, 13, 13)",
                padding: "8px 0",
                position: "relative",
                zIndex: 10,
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "0 20px",
                }}
            >
                <div style={{ marginLeft: "20px" }}>
                    <img
                        src={dinoImg}
                        alt="bridge"
                        style={{ height: "40px" }}
                    />
                </div>
                <div style={{ color: "white", fontSize: "24px", fontWeight: "bold", marginRight: '20px' }}>
                    DINO GAME
                </div>
                <div style={{ display: "flex", gap: "20px", marginRight: '30px' }}>
                    <Link
                        to="/"
                        style={{
                            color: "white",
                            padding: "8px 15px",
                            borderRadius: "8px",
                            textDecoration: "none",
                            fontFamily: "sans-serif",
                            fontWeight: "500",
                        }}
                    >
                        Home
                    </Link>
                    <Link
                        to="/GamePage"
                        style={{
                            color: "white",
                            padding: "8px 15px",
                            borderRadius: "8px",
                            textDecoration: "none",
                            fontFamily: "sans-serif",
                            fontWeight: "500",
                        }}
                    >
                        Game
                    </Link>
                    <Link
                        to="/buy"
                        style={{
                            color: "white",
                            padding: "8px 15px",
                            borderRadius: "8px",
                            textDecoration: "none",
                            fontFamily: "sans-serif",
                            fontWeight: "500",
                        }}
                    >
                        Buy Characters
                    </Link>
                    <Link
                        to="/yourCharacters"
                        style={{
                            color: "white",
                            padding: "8px 15px",
                            borderRadius: "8px",
                            textDecoration: "none",
                            fontFamily: "sans-serif",
                            fontWeight: "500",
                        }}
                    >
                        Your Characters
                    </Link>
                </div>
                <div>
                    <ConnectButton />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;