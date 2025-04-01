import { useAccount, useReadContract } from "wagmi";
import Navbar from "./Navbar";
import { Abi } from "../assets/NFt.json";
import { useEffect, useState } from "react";
import { useCharacter } from "../Context/CharacterContext";

const NFTcontractAddress = "0x70ED1e6e34B4b3D7176E563B67b9A64D628597C6";

const nftTotalList = [
    { id: 1, name: "Pikachu", price: "10", image: "/pokemon.jpg" },
    { id: 2, name: "Blastoise", price: "20", image: "/Blastoise.jpeg" },
    { id: 500, name: "Takaratomy", price: "30", image: "/Takaratomy.jpg" },
    { id: 1500, name: "Charizard", price: "40", image: "/Charizard.jpg" }
];

const YourCharacters = () => {
    const tokenIds = nftTotalList.map(nft => nft.id);
    const [userNfts, setUserNfts] = useState([]);
    const [selectedNFT, setSelectedNFT] = useState(null);

    const { address } = useAccount();
    const { setCharacter } = useCharacter();

    const { data, isLoading, isError } = useReadContract({
        address: NFTcontractAddress,
        abi: Abi,
        functionName: "balanceOfBatch",
        args: [Array(tokenIds.length).fill(address), tokenIds],
        watch: true,
    });

    // Use useEffect to filter NFTs when data changes
    useEffect(() => {
        if (data) {
            const balances = data.map(b => Number(b));
            console.log("balances", balances);

            const ownedNfts = nftTotalList.filter((nft, index) => balances[index] > 0);
            setUserNfts(ownedNfts);
            console.log(ownedNfts);
        }
    }, [data]);

    if (isLoading) return <><Navbar /><p>Loading...</p></>;
    if (isError) return <><Navbar /><p>Error fetching balances</p></>;

    async function selectCharacter(nft) {
        setCharacter(nft.image);
        setSelectedNFT(nft.id);
    }

    return (
        <>
            <Navbar />
            <h2>Your Characters</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
                {userNfts.map((nft) => (
                    <div
                        key={nft.id}
                        style={{
                            width: "250px",
                            height: "350px",
                            border: "2px solid #ccc",
                            padding: "10px",
                            borderRadius: "10px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-between",
                            textAlign: "center"
                        }}
                    >
                        <img
                            src={nft.image}
                            alt={nft.name}
                            style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "5px" }}
                            onClick={() => selectCharacter(nft)}
                        />
                        <p style={{ fontWeight: "bold", fontSize: "16px" }}>{nft.name}</p>
                        <button
                            onClick={() => selectCharacter(nft)}
                            style={{
                                padding: "8px 12px",
                                backgroundColor: "#007bff",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}
                        >
                            {selectedNFT === nft.id ? "Selected" : "Select"}
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default YourCharacters;

