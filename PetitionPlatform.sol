// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// PetitionPlatform
// A platform that holds MANY petitions. Only the owner (the wallet that
// deploys this) can create new petitions. Anyone with a wallet can sign any
// petition — once each. Signatures can never be edited, faked, or deleted.

contract PetitionPlatform {
    address public owner; // the wallet that deployed this (you / your team)

    // ---- One petition ----
    struct Petition {
        uint256 id;
        string title;
        string description;
        uint256 signatureCount; // updated each time someone signs
    }

    // ---- One signature ----
    struct Signature {
        address signer;
        string comment;    // optional message (can be empty)
        uint256 timestamp; // when they signed
    }

    // ---- Storage ----
    Petition[] private petitions; // every petition, indexed by id (0, 1, 2, ...)

    // petition id  =>  list of its signatures
    mapping(uint256 => Signature[]) private signaturesByPetition;

    // petition id  =>  wallet  =>  already signed this one?
    mapping(uint256 => mapping(address => bool)) public hasSigned;

    // ---- Events (let the frontend react instantly) ----
    event PetitionCreated(uint256 indexed id, string title);
    event PetitionSigned(uint256 indexed id, address indexed signer, string comment);

    // ---- Only the owner can run functions marked onlyOwner ----
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can do this");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // ---- OWNER ACTION: create a new petition ----
    function createPetition(string calldata title, string calldata description)
        external
        onlyOwner
    {
        uint256 newId = petitions.length;
        petitions.push(Petition(newId, title, description, 0));
        emit PetitionCreated(newId, title);
    }

    // ---- THE MAIN ACTION: sign a petition by its id ----
    function sign(uint256 petitionId, string calldata comment) external {
        require(petitionId < petitions.length, "Petition does not exist");
        require(!hasSigned[petitionId][msg.sender], "You already signed this petition");

        hasSigned[petitionId][msg.sender] = true;
        signaturesByPetition[petitionId].push(
            Signature(msg.sender, comment, block.timestamp)
        );
        petitions[petitionId].signatureCount += 1;

        emit PetitionSigned(petitionId, msg.sender, comment);
    }

    // ---- Reads (free — no gas, no wallet popup) ----

    // How many petitions exist (for "Active Petitions" and to loop over them).
    function getPetitionCount() external view returns (uint256) {
        return petitions.length;
    }

    // Every petition at once (for rendering the browse/list view + cards).
    function getAllPetitions() external view returns (Petition[] memory) {
        return petitions;
    }

    // One petition's full details (title, description, signatureCount).
    function getPetition(uint256 petitionId)
        external
        view
        returns (Petition memory)
    {
        require(petitionId < petitions.length, "Petition does not exist");
        return petitions[petitionId];
    }

    // All signatures for one petition (for its "Recent Signers" list).
    function getSignatures(uint256 petitionId)
        external
        view
        returns (Signature[] memory)
    {
        require(petitionId < petitions.length, "Petition does not exist");
        return signaturesByPetition[petitionId];
    }
}
