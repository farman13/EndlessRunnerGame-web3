const express = require('express');
const { ethers, JsonRpcProvider, Wallet, Contract } = require('ethers');
const cors = require('cors');
require('dotenv').config();

const { dinoAbi } = require('./ABIs/Abi.json');
const { nftAbi } = require('./ABIs/nftAbi.json');

const privateKey = process.env.PRIVATE_KEY;
console.log(process.env.PRIVATE_KEY);

const provider = new JsonRpcProvider(process.env.RPC_URL);
console.log(provider);

const dinocontractAddress = '0x98ba2bbf253E507E4656b018faD50ceFa74Eb5BC';
const nftMarketcontract = "0xEDD3CFAD07dB2F501fFf6a10D02D5a9a974a7319";

function getWallet() {
    return new Wallet(privateKey, provider);
}

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Server running");
});

app.post('/airdropDino', async (req, res) => {
    try {
        const { address, amount } = req.body;

        const wallet = getWallet();
        const contract = new Contract(dinocontractAddress, dinoAbi, wallet);
        console.log(contract);

        const tx = await contract.mint(address, ethers.parseUnits(amount.toString(), 18));
        await tx.wait();

        res.json({ message: "Token received", txHash: tx.hash });

    } catch (error) {
        console.error("AirdropDino Error:", error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
});

app.post('/airdropNFT', async (req, res) => {
    try {
        const { address, id } = req.body;

        const wallet = getWallet();
        const contract = new Contract(nftMarketcontract, nftAbi, wallet);

        const txn = await contract.freeNFT(address, id);
        await txn.wait();

        res.json({ message: "NFT gifted", txHash: txn.hash });

    } catch (error) {
        console.error("AirdropNFT Error:", error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
