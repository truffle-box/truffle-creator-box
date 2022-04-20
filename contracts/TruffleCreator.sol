// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Remixr is ERC721URIStorage {
    string baseURI;

    using Counters for Counters.Counter;
    Counters.Counter private _id;

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

    function setTokenURI(
        uint256 tokenId, 
        string memory tokenURI
    ) external {
        _setTokenURI(tokenId, tokenURI);
    }
    
    function setBaseURI(string memory baseURI_) external {
        baseURI = baseURI_;
    }
    
    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function mint(
        address owner, 
        string memory cid
    ) external returns (uint256) {
        _id.increment();
        uint256 newId = _id.current();

        _mint(owner, newId);
        _setTokenURI(newId, cid);

        return newId;
    }
}
