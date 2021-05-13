// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Burnable.sol";

contract MFT is ERC721, ERC721Burnable {
    using Counters for Counters.Counter;
    Counters.Counter private _id;

    constructor() ERC721("Truffle Creator", "TRFL") public {
        _setBaseURI("ipfs://");
    }

    function mint(address owner, string memory cid) public returns (uint256) {

        _id.increment();

        uint256 newId = _id.current();
        _mint(owner, newId);
        _setTokenURI(newId, cid);

        return newId;
    }

    // function burnById(uint256 tokenId) public{
    //     burn(tokenId);
    // }
}
