// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

contract nft is ERC1155, Ownable {
    string private baseURI;

    constructor(string memory _uri)
        ERC1155("") 
        Ownable(msg.sender)
    {
        baseURI = _uri;
    }

    
    function mint(address account, uint256 id,uint256 amount)
        public
        onlyOwner
    {
        _mint(account, id, amount, "");
    }
       
    function setURI(string memory newuri) public onlyOwner {
        baseURI = newuri;
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        return string(abi.encodePacked(baseURI, Strings.toString(tokenId), ".json"));
    }

    function contractURI() public view returns (string memory) {
    return string(abi.encodePacked(baseURI, "collection.json"));
}


   
}


//"https://ipfs.io/ipfs/bafybeiez542kslu5pknkcbrrbcsqtznre2sjndlxl6o56hzpza7nsmpvv4/"
//0x70ED1e6e34B4b3D7176E563B67b9A64D628597C6