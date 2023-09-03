import { ethers } from "ethers";
import { config as loadEnv } from 'dotenv';
import { promises } from "fs";
const fsPromises = promises;
loadEnv();

const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY!!;
const INFURA_API_KEY = process.env.INFURA_API_KEY;
const POLYGON_CONTRACT_ADDRESS = "0xAa087a1e4D2089558EB7d82CE6FF7A9a21f84fFe"; // zkEvmTestnet
const my_address = "0x6f9e2777D267FAe69b0C5A24a402D14DA1fBcaA1";
const GOERLI_CONTRACT_ADDRESS = "0xd19230FF206A07A7C329f82F274290b1d9DcD7AC";
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
    const send_tx = await my_contract.sendTokens(destinationChain, destinationAddress, link, amount);  // second argumnent is id
    return send_tx;
}


sendTokens("polygon-zkevm", POLYGON_CONTRACT_ADDRESS, "hi", 10n )



