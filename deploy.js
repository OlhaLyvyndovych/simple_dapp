const fs = require('fs');
const { ethers } = require('ethers');

// abi and bytecode - read from files
const ABI = JSON.parse(fs.readFileSync('./contracts/build/trust_sol_Trust.abi'));
console.log(ABI);

const bytecode = fs.readFileSync('./contracts/build/trust_sol_Trust.bin').toString();

//Connect to the blockchain
const provider = new ethers.getDefaultProvider("HTTP://127.0.0.1:7545"); // This from Ganache, but also can be from infura
const hexPrivateKey = new Buffer.from("1df3370a8535b56a2930493feae9a3850d8f28cc7b6de6144d0bb7bea738f25a", "hex");

const signer = new ethers.Wallet(hexPrivateKey, provider);
//To deploy smart contract on given blockchain (Ganache - private in memory blockchain)
async function deploy() {
    const factory = new ethers.ContractFactory(ABI, bytecode, signer);
    const contract = await factory.deploy();
    const deployContract = await contract.deployed();

    console.log("deployed Contract Address : ", deployContract.address);
}
deploy()