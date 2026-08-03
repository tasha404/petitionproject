// petitionService.js
// The bridge between the React frontend and the PetitionPlatform smart
// contract on BOT Chain. Every component that touches the blockchain imports
// from this one file.
//
// Requires ethers v6:  npm install ethers

import { ethers } from "ethers";

// ---------------------------------------------------------------------------
// 1. Contract details
//    (This address is live on BOT Chain MAINNET.)
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
// 2. Network config — BOT Chain MAINNET (Chain ID 677)
//    677 in hex is 0x2A5.
// ---------------------------------------------------------------------------

export const NETWORK = {
  chainId: "0x2A5",
  chainName: "BOT Chain Mainnet",
  rpcUrls: ["https://rpc.botchain.ai"],
  nativeCurrency: { name: "BOT", symbol: "BOT", decimals: 18 },
  blockExplorerUrls: ["https://scan.botchain.ai"],
};

// ---------------------------------------------------------------------------
// 3. Providers & contract instances
// ---------------------------------------------------------------------------

function getReadContract() {
  const provider = new ethers.JsonRpcProvider(NETWORK.rpcUrls[0]);
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
}

async function getWriteContract() {
  if (!window.ethereum) {
    throw new Error("MetaMask not found. Please install it to continue.");
  }
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
}

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
    timestamp: Number(s.timestamp),
  };
}

// ---------------------------------------------------------------------------
// 4. Wallet helpers  (for WalletButton.jsx)
// ---------------------------------------------------------------------------

export async function connectWallet() {
  if (!window.ethereum) {
    throw new Error("MetaMask not found. Please install it to continue.");
  }
  const provider = new ethers.BrowserProvider(window.ethereum);
  const accounts = await provider.send("eth_requestAccounts", []);
  await ensureCorrectNetwork();
  return accounts[0];
}

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

export async function getCurrentAccount() {
  if (!window.ethereum) return null;
  const provider = new ethers.BrowserProvider(window.ethereum);
  const accounts = await provider.send("eth_accounts", []);
  return accounts.length > 0 ? accounts[0] : null;
}

// ---------------------------------------------------------------------------
// 5. Reads
// ---------------------------------------------------------------------------

export async function getAllPetitions() {
  const contract = getReadContract();
  const raw = await contract.getAllPetitions();
  return raw.map(normalizePetition);
}

export async function getPetition(petitionId) {
  const contract = getReadContract();
  const raw = await contract.getPetition(petitionId);
  return normalizePetition(raw);
}

export async function getPetitionCount() {
  const contract = getReadContract();
  return Number(await contract.getPetitionCount());
}

export async function getSignatures(petitionId) {
  const contract = getReadContract();
  const raw = await contract.getSignatures(petitionId);
  return raw.map(normalizeSignature);
}

export async function hasSigned(petitionId, address) {
  const contract = getReadContract();
  return await contract.hasSigned(petitionId, address);
}

// ---------------------------------------------------------------------------
// 6. Writes
// ---------------------------------------------------------------------------

export async function signPetition(petitionId, comment = "") {
  const contract = await getWriteContract();
  const tx = await contract.sign(petitionId, comment);
  await tx.wait();
  return tx.hash;
}

export async function createPetition(title, description) {
  const contract = await getWriteContract();
  const tx = await contract.createPetition(title, description);
  await tx.wait();
  return tx.hash;
}