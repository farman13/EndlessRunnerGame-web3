// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {IERC1155} from '@openzeppelin/contracts/token/ERC1155/IERC1155.sol';
import {IERC20} from '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import {Ownable} from '@openzeppelin/contracts/access/Ownable.sol';

interface INFT is IERC1155{
     function mint(address account, uint256 id,uint256 amount) external ;

}
contract NftMarketplace is Ownable{
    
    INFT nftContract;
    IERC20 dinoToken;

    constructor(address _nftContract,address _dinoToken ) Ownable(msg.sender){
        nftContract = INFT(_nftContract);
        dinoToken = IERC20(_dinoToken);
        tokenPrice[1] = 10*1e18;
        tokenPrice[2] = 20*1e18;

    }

    mapping(uint256 token => uint256 price) public tokenPrice;
    mapping(address user => uint256[] tokenIds) public tokensHoldings;
    
    function setTokenPrice( uint tokenId,uint price) public onlyOwner {
        tokenPrice[tokenId] = price;
    }
     

    function buyNFT(uint256 tokenId) external {
        require(dinoToken.allowance(msg.sender,address(this)) >= tokenPrice[tokenId]);
        dinoToken.transferFrom(msg.sender ,address(this), tokenPrice[tokenId] );
        nftContract.mint(msg.sender, tokenId, 1);
        tokensHoldings[msg.sender].push(tokenId);
    }

    function freeNFT(address account, uint256 tokenId) external onlyOwner {
        nftContract.mint(account,tokenId,1);
        tokensHoldings[msg.sender].push(tokenId);
    }

    function getUserTokensIds(address user) public view returns(uint256[] memory){
        return tokensHoldings[user];
    }

    function withdraw() public onlyOwner{
        dinoToken.transfer(msg.sender, address(this).balance);
         }
}

// adding withdraw()
// add getokens mapping to get all the tokens owned by a user
// make this contract owner of nft contract 
//0xB218d330B7b36D2aDDbd1AADf4C2d90Bfd2d83d9 - new