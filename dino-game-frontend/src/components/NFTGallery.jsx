import { useWriteContract, usePublicClient, useAccount } from "wagmi";
import { parseUnits } from "viem";
import { dinoAbi } from "../assets/DinoABI.json";
import { nftAbi } from "../assets/NftMarketplaceABI.json"
import Navbar from "./Navbar";

const NFTMarketcontractAddress = "0xB218d330B7b36D2aDDbd1AADf4C2d90Bfd2d83d9"; // Your contract
const DinoContractAddress = "0x98ba2bbf253E507E4656b018faD50ceFa74Eb5BC";

const nftList = [
    { id: 1, name: "Pikachu", price: "10", image: "/pokemon.jpg" },
    { id: 2, name: "Charizard", price: "20", image: "/Blastoise.jpeg" },
];

export default function NFTGallery() {

    const { writeContractAsync } = useWriteContract();

    const publicClient = usePublicClient();
    const { address } = useAccount();
    //need to update
    const handleMint = async (id, price) => {

        const amount = parseUnits(price, 18);
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
            args: [id]
        });
        console.log("end")
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
                            onClick={() => handleMint(nft.id, nft.price)}
                        />
                        <p style={{ fontWeight: "bold", fontSize: "16px" }}>{nft.name}</p>
                        <p style={{ fontSize: "14px", color: "gray" }}>Price: {nft.price} dinos </p>
                        <button
                            onClick={() => handleMint(nft.id, nft.price)}
                            style={{
                                padding: "8px 12px",
                                backgroundColor: "#007bff",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}
                        >
                            Buy
                        </button>
                    </div>
                ))}
                { /*isLoading && <p>Minting NFT...</p>}
                {isSuccess && <p>NFT Minted Successfully!</p> */}
            </div>
        </>
    );
}
