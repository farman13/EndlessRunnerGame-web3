// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {IERC1155} from '@openzeppelin/contracts/token/ERC1155/IERC1155.sol';
import {IERC20} from '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import {Ownable} from '@openzeppelin/contracts/access/Ownable.sol';

interface INFT is IERC1155{
     function mint(address account, uint256 id,uint256 amount) external ;

}
contract NftMarketplace is Ownable{
    
    event NftMarketplace__buyNFT(address indexed buyer, uint256 indexed tokenId);
    event NftMarketplace__freeNFT(address indexed account, uint256 indexed tokenId);


    INFT nftContract;
    IERC20 dinoToken;
   
    constructor(address _nftContract,address _dinoToken ) Ownable(msg.sender){
        nftContract = INFT(_nftContract);
        dinoToken = IERC20(_dinoToken);
        tokenPrice[1] = 10*1e18;
        tokenPrice[2] = 20*1e18;

    }

    mapping(uint256 token => uint256 price) public tokenPrice;
    
    function setTokenPrice( uint tokenId,uint price) public onlyOwner {
        tokenPrice[tokenId] = price;
    }
     

    function buyNFT(uint256 tokenId) external {
        require(dinoToken.allowance(msg.sender,address(this)) >= tokenPrice[tokenId]);
        dinoToken.transferFrom(msg.sender ,address(this), tokenPrice[tokenId] );
        nftContract.mint(msg.sender, tokenId, 1);
        emit NftMarketplace__buyNFT(msg.sender,tokenId);
    }

    function freeNFT(address account, uint256 tokenId) external onlyOwner {
        nftContract.mint(account,tokenId,1);
        emit NftMarketplace__freeNFT(account,tokenId);
    }


    function withdraw() public onlyOwner{
        dinoToken.transfer(msg.sender, address(this).balance);
         }
}


// make sure this contract owner of nft contract 
//0xEDD3CFAD07dB2F501fFf6a10D02D5a9a974a7319