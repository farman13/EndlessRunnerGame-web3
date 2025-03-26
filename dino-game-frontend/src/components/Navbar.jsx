import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav
            style={{
                backgroundColor: "#2d3748",
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
                <div>
                    <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABu0lEQVR4nO2XQU/CMBTHywXFBCNcDErk4AlBTZSDgQ/rwVvjWLu1b10ZIUayk98J00WSSXCAdAjz/ZIly/pv+976b9NHCIIgCIJsgeThoAgPKUwiaZZ+PLC2vQtI/ttEZFH2iCxKIsi+IXk4AK6ffCfsCvFeW6ePoqpu9KafLWtsGwNZHNDzRldZA4hX0crb794vYkgaKKVlcKApXNU3H4UQtZ/+QtLuqr7vR5emH7GE1RjAgaYRBXzcWTaI74fdxAYONG0lkEsMlNLy3K9LJ/nyo82VyC0GmXEu7+rMljZiwEQsInFFUqC1LCLRWinQWhaRaK0UaK19thZjrCqEbmumLwiZlbIGgRc4FUPdNlfr2WxWyppjlVYuxjDUbbZGDCSO48rkeXIMAEdzIedBJ124CBE+zt8pjStGayZxnKBhrtzfCh2me0KMW6amoJRurJUbxKCUqk/ZtEoAJsn9f+nDdC8I3hrAopuVld0fasFc+V3XPfN9dZ9ky3QPeHQHQ7g2tXN62T3v48SUoAEPOoEXPeyLVrqjW86jc7LKy+ZP2PD9LrQkvUfy8n1eWoV7hB/gHkEQBEEQks0npiwDPS4USB8AAAAASUVORK5CYII="
                        alt="bridge"
                        style={{ height: "40px" }}
                    />
                </div>
                <div style={{ color: "white", fontSize: "24px", fontWeight: "bold" }}>
                    Dino Game
                </div>
                <div style={{ display: "flex", gap: "20px" }}>
                    <Link
                        to="/"
                        style={{
                            color: "white",
                            backgroundColor: "#4299e1",
                            padding: "8px 15px",
                            borderRadius: "8px",
                            textDecoration: "none",
                            transition: "transform 0.2s, background-color 0.3s",
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#2b6cb0")}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#4299e1")}
                    >
                        Home
                    </Link>
                    <Link
                        to="/buy"
                        style={{
                            color: "white",
                            backgroundColor: "#4299e1",
                            padding: "8px 15px",
                            borderRadius: "8px",
                            textDecoration: "none",
                            transition: "transform 0.2s, background-color 0.3s",
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#2b6cb0")}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#4299e1")}
                    >
                        Buy Characters
                    </Link>
                    <Link
                        to="/yourCharacters"
                        style={{
                            color: "white",
                            backgroundColor: "#4299e1",
                            padding: "8px 15px",
                            borderRadius: "8px",
                            textDecoration: "none",
                            transition: "transform 0.2s, background-color 0.3s",
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#2b6cb0")}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#4299e1")}
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