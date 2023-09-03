import { ethers } from "ethers";
import { config as loadEnv } from 'dotenv';
import { promises } from "fs";
const fsPromises = promises;
loadEnv();

const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY!!;
const INFURA_API_KEY = process.env.INFURA_API_KEY;
const POLYGON_CONTRACT_ADDRESS = "0x2BbCDdD17B209dC70493807F62a46a6F3F261072"; // zkEvmTestnet
const LINEA_CONTRACT_ADDRESS = " ";
const my_address = "0x6f9e2777D267FAe69b0C5A24a402D14DA1fBcaA1";
<<<<<<< HEAD
const GOERLI_CONTRACT_ADDRESS = "0x863DDd4463fF61c9527BfAA0991b347DaFe9fD08";
=======
const GOERLI_CONTRACT_ADDRESS = "0x82FE5f81Ee72c4B655E467b7DC79BCe772EF44d5";
>>>>>>> 6ddd8abec29aee3b17310c4703e68413978cd1da
const UPDATED_ABI_FILE_PATH = './build/contracts/PayLinkInterchain.json';

const provider = ethers.getDefaultProvider(`https://goerli.infura.io/v3/`+ INFURA_API_KEY);  // goerli 
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

async function getAbi(){
    const data = await fsPromises.readFile(UPDATED_ABI_FILE_PATH, 'utf8');
    const abi = JSON.parse(data)['abi'];
    //console.log(abi);
    return abi;
}

const getContract = async function () {
    const abi = await getAbi();
    const my_contract = await new ethers.Contract(GOERLI_CONTRACT_ADDRESS, abi, signer);
    return my_contract;
}

export async function sendTokens(destinationChain: string, destinationAddress: string, link: string, amount: any) {
    const my_contract = await getContract();
    const send_tx = await my_contract.sendTokens(destinationChain, destinationAddress, link, amount, {value: ethers.parseEther("0.5")}); 
    return send_tx;
}

//sendTokens("polygon-zkevm", POLYGON_CONTRACT_ADDRESS, "hi", 100000n )

export async function deposit() {
    const my_contract = await getContract();
    const deposit_tx = await my_contract.deposit("hi");  // second argumnent is id
    return await deposit_tx;
}


export async function sendMessage(destinationChain: string, destinationAddress: string){
    const my_contract = await getContract();
    const send_tx = await my_contract.callContract( destinationChain, destinationAddress, "hi", {value: ethers.parseEther("0.1")}); 
    return send_tx; 
}
//const dep = deposit();

sendMessage("polygon-zkevm", POLYGON_CONTRACT_ADDRESS);



