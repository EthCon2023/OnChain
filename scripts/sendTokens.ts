import { ethers } from "ethers";
import { config as loadEnv } from 'dotenv';
import { promises } from "fs";
import { Uint } from "web3";
const fsPromises = promises;
loadEnv();

const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY!!;
const POLYGON_CONTRACT_ADDRESS = "0x39B45E1147f0A19F9D2979a1CBa2e8660fB34408";
const my_address = "0x6f9e2777D267FAe69b0C5A24a402D14DA1fBcaA1";
const GOERLI_CONTRACT_ADDRESS = "0xb2d1BAa5fD0Ba77a6060D2D494a82EC025dA82EF";
const UPDATED_ABI_FILE_PATH = '../build/contracts/PayLinkInterchain.json';

const provider = ethers.getDefaultProvider(``);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

async function getAbi(){
    const data = await fsPromises.readFile(UPDATED_ABI_FILE_PATH, 'utf8');
    const abi = JSON.parse(data)['abi'];
    //console.log(abi);
    return abi;
}

    
const getContract = async function () {
    const abi = await getAbi();
    const my_contract = new ethers.Contract(GOERLI_CONTRACT_ADDRESS, abi, signer);
    return my_contract;
}

const my_contract = await getContract();

export async function sendTokens(destinationChain: string ,destinationAddress: string, link: string, amount: Uint) {
    const send_tx = await my_contract.sendTokens(destinationChain, destinationAddress, link, amount);  // second argumnent is id
    return send_tx;
}




