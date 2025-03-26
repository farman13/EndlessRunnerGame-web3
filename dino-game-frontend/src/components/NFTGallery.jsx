import { useWriteContract, usePublicClient, useAccount } from "wagmi";
import { parseUnits } from "viem";
import { dinoAbi } from "../assets/DinoABI.json";
import { nftAbi } from "../assets/NftMarketplaceABI.json"
import Navbar from "./Navbar";
import { useState } from "react";

const NFTMarketcontractAddress = "0xEDD3CFAD07dB2F501fFf6a10D02D5a9a974a7319"; // Your contract
const DinoContractAddress = "0x98ba2bbf253E507E4656b018faD50ceFa74Eb5BC";

const nftList = [
    { id: 1, name: "Pikachu", price: "10", image: "/pokemon.jpg" },
    { id: 2, name: "Charizard", price: "20", image: "/Blastoise.jpeg" },
    { id: 500, name: "Takaratomy", price: "30", image: "/Takaratomy.jpg" }
];

export default function NFTGallery() {

    const { writeContractAsync } = useWriteContract();

    const publicClient = usePublicClient();
    const { address } = useAccount();
    const [buy, setBuy] = useState(null);

    const handleMint = async (nft) => {

        const amount = parseUnits(nft.price, 18);
        console.log(amount);
        console.log(address);

        const approveTxnHash = await writeContractAsync({
            abi: dinoAbi,
            address: DinoContractAddress,
            functionName: "approve",
            args: [NFTMarketcontractAddress, amount]
        });

        console.log(approveTxnHash);
        await publicClient.waitForTransactionReceipt({ hash: approveTxnHash });

        await writeContractAsync({
            abi: nftAbi,
            address: NFTMarketcontractAddress,
            functionName: "buyNFT",
            args: [nft.id]
        });

        setBuy(nft.id);
    };

    return (
        <>
            <Navbar />
            <h2>Buy Characters</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
                {nftList.map((nft) => (
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
                            onClick={() => handleMint(nft)}
                        />
                        <p style={{ fontWeight: "bold", fontSize: "16px" }}>{nft.name}</p>
                        <p style={{ fontSize: "14px", color: "gray" }}>Price: {nft.price} dinos </p>
                        <button
                            onClick={() => handleMint(nft)}
                            style={{
                                padding: "8px 12px",
                                backgroundColor: "#007bff",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}
                        >
                            {buy == nft.id ? "purchased" : "Buy"}
                        </button>
                    </div>
                ))}
                { /*isLoading && <p>Minting NFT...</p>}
                {isSuccess && <p>NFT Minted Successfully!</p> */}
            </div>
        </>
    );
}
