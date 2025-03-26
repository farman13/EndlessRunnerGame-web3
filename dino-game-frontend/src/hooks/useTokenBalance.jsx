import { useReadContract, useAccount } from "wagmi";
import { formatUnits } from "viem";

const tokenAbi = [
    {
        "constant": true,
        "inputs": [{ "name": "account", "type": "address" }],
        "name": "balanceOf",
        "outputs": [{ "name": "", "type": "uint256" }],
        "type": "function"
    }
];

const tokenAddress = "0x98ba2bbf253E507E4656b018faD50ceFa74Eb5BC";

export function useTokenBalance() {
    const { address } = useAccount();

    const { data: balance, isLoading, isError, refetch } = useReadContract({
        address: tokenAddress,
        abi: tokenAbi,
        functionName: "balanceOf",
        args: [address],
        watch: false,
    });

    return {
        balance: balance ? formatUnits(balance, 18) : "0",
        isLoading,
        isError,
        refetchBalance: refetch
    };
}
