// petitionService.js
// The bridge between the React frontend and the PetitionPlatform smart
// contract on BOT Chain. Every component that touches the blockchain imports
// from this one file — so if the contract address ever changes (e.g. when we
// redeploy to mainnet), we only update it HERE.
//
// Requires ethers v6:  npm install ethers

import { ethers } from "ethers";

// ---------------------------------------------------------------------------
// 1. Contract details  (update CONTRACT_ADDRESS when we redeploy to mainnet)
// ---------------------------------------------------------------------------

export const CONTRACT_ADDRESS = "0xD2568d5566E87a3F0C6255d7aFD7EFf7DF08B9f1";

export const ABI = [
  { inputs: [{ internalType: "string", name: "title", type: "string" }, { internalType: "string", name: "description", type: "string" }], name: "createPetition", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  { anonymous: false, inputs: [{ indexed: true, internalType: "uint256", name: "id", type: "uint256" }, { indexed: false, internalType: "string", name: "title", type: "string" }], name: "PetitionCreated", type: "event" },
  { anonymous: false, inputs: [{ indexed: true, internalType: "uint256", name: "id", type: "uint256" }, { indexed: true, internalType: "address", name: "signer", type: "address" }, { indexed: false, internalType: "string", name: "comment", type: "string" }], name: "PetitionSigned", type: "event" },
  { inputs: [{ internalType: "uint256", name: "petitionId", type: "uint256" }, { internalType: "string", name: "comment", type: "string" }], name: "sign", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [], name: "getAllPetitions", outputs: [{ components: [{ internalType: "uint256", name: "id", type: "uint256" }, { internalType: "string", name: "title", type: "string" }, { internalType: "string", name: "description", type: "string" }, { internalType: "uint256", name: "signatureCount", type: "uint256" }], internalType: "struct PetitionPlatform.Petition[]", name: "", type: "tuple[]" }], stateMutability: "view", type: "function" },
  { inputs: [{ internalType: "uint256", name: "petitionId", type: "uint256" }], name: "getPetition", outputs: [{ components: [{ internalType: "uint256", name: "id", type: "uint256" }, { internalType: "string", name: "title", type: "string" }, { internalType: "string", name: "description", type: "string" }, { internalType: "uint256", name: "signatureCount", type: "uint256" }], internalType: "struct PetitionPlatform.Petition", name: "", type: "tuple" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "getPetitionCount", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [{ internalType: "uint256", name: "petitionId", type: "uint256" }], name: "getSignatures", outputs: [{ components: [{ internalType: "address", name: "signer", type: "address" }, { internalType: "string", name: "comment", type: "string" }, { internalType: "uint256", name: "timestamp", type: "uint256" }], internalType: "struct PetitionPlatform.Signature[]", name: "", type: "tuple[]" }], stateMutability: "view", type: "function" },
  { inputs: [{ internalType: "uint256", name: "", type: "uint256" }, { internalType: "address", name: "", type: "address" }], name: "hasSigned", outputs: [{ internalType: "bool", name: "", type: "bool" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "owner", outputs: [{ internalType: "address", name: "", type: "address" }], stateMutability: "view", type: "function" },
];

// ---------------------------------------------------------------------------
// 2. Network config — BOT Chain Testnet (Chain ID 968)
//    968 in hex is 0x3C8. When we move to mainnet, swap these for Chain ID 677.
// ---------------------------------------------------------------------------

export const NETWORK = {
  chainId: "0x3C8",
  chainName: "BOT Chain Testnet",
  rpcUrls: ["https://rpc.bohr.life"],
  nativeCurrency: { name: "BOT", symbol: "BOT", decimals: 18 },
  blockExplorerUrls: ["https://scan.bohr.life/"],
};

// ---------------------------------------------------------------------------
// 3. Providers & contract instances
// ---------------------------------------------------------------------------

// READ contract: talks straight to the BOT Chain RPC, so the petition list
// loads even before the user connects a wallet. (If this ever hits a CORS
// error in the browser, swap it to the BrowserProvider version like below.)
function getReadContract() {
  const provider = new ethers.JsonRpcProvider(NETWORK.rpcUrls[0]);
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
}

// WRITE contract: uses the user's MetaMask so they can sign transactions.
async function getWriteContract() {
  if (!window.ethereum) {
    throw new Error("MetaMask not found. Please install it to continue.");
  }
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
}

// Turn a raw contract Petition (ethers returns BigInts) into a clean JS object.
function normalizePetition(p) {
  return {
    id: Number(p.id),
    title: p.title,
    description: p.description,
    signatureCount: Number(p.signatureCount),
  };
}

function normalizeSignature(s) {
  return {
    signer: s.signer,
    comment: s.comment,
    timestamp: Number(s.timestamp), // unix seconds
  };
}

// ---------------------------------------------------------------------------
// 4. Wallet helpers  (for WalletButton.jsx)
// ---------------------------------------------------------------------------

// Connect MetaMask and make sure it's on BOT Chain Testnet. Returns the address.
export async function connectWallet() {
  if (!window.ethereum) {
    throw new Error("MetaMask not found. Please install it to continue.");
  }
  const provider = new ethers.BrowserProvider(window.ethereum);
  const accounts = await provider.send("eth_requestAccounts", []);
  await ensureCorrectNetwork();
  return accounts[0];
}

// Ask MetaMask to switch to BOT Chain Testnet; add it if it isn't there yet.
export async function ensureCorrectNetwork() {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: NETWORK.chainId }],
    });
  } catch (err) {
    if (err.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [NETWORK],
      });
    } else {
      throw err;
    }
  }
}

// Get the currently connected address without popping up MetaMask (or null).
export async function getCurrentAccount() {
  if (!window.ethereum) return null;
  const provider = new ethers.BrowserProvider(window.ethereum);
  const accounts = await provider.send("eth_accounts", []);
  return accounts.length > 0 ? accounts[0] : null;
}

// ---------------------------------------------------------------------------
// 5. Reads  (Stats, ProgressBar, PetitionCard, RecentSigners, Home list)
// ---------------------------------------------------------------------------

// Every petition at once — for the browse/list view.
export async function getAllPetitions() {
  const contract = getReadContract();
  const raw = await contract.getAllPetitions();
  return raw.map(normalizePetition);
}

// One petition's details by id.
export async function getPetition(petitionId) {
  const contract = getReadContract();
  const raw = await contract.getPetition(petitionId);
  return normalizePetition(raw);
}

// How many petitions exist — for "Active Petitions" stat.
export async function getPetitionCount() {
  const contract = getReadContract();
  return Number(await contract.getPetitionCount());
}

// All signatures for one petition — for its "Recent Signers" list.
// (Reverse + slice in the component to show the latest few.)
export async function getSignatures(petitionId) {
  const contract = getReadContract();
  const raw = await contract.getSignatures(petitionId);
  return raw.map(normalizeSignature);
}

// Has THIS wallet already signed THIS petition? (to disable the Sign button)
export async function hasSigned(petitionId, address) {
  const contract = getReadContract();
  return await contract.hasSigned(petitionId, address);
}

// ---------------------------------------------------------------------------
// 6. Writes  (SignButton, and admin createPetition)
// ---------------------------------------------------------------------------

// THE MAIN ACTION: sign a petition. comment is optional ("" is fine).
// Waits for the transaction to be mined, then returns the tx hash.
export async function signPetition(petitionId, comment = "") {
  const contract = await getWriteContract();
  const tx = await contract.sign(petitionId, comment);
  await tx.wait();
  return tx.hash;
}

// OWNER ONLY: create a new petition. Will be rejected by the contract for any
// wallet that isn't the deployer.
export async function createPetition(title, description) {
  const contract = await getWriteContract();
  const tx = await contract.createPetition(title, description);
  await tx.wait();
  return tx.hash;
}