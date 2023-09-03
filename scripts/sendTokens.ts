import { ethers } from "ethers";
import { config as loadEnv } from 'dotenv';
import { promises } from "fs";
const fsPromises = promises;
loadEnv();

const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;
const POLYGON_CONTRACT_ADDRESS = "0x39B45E1147f0A19F9D2979a1CBa2e8660fB34408";
const my_address = "0x6f9e2777D267FAe69b0C5A24a402D14DA1fBcaA1";
const GOERLI_CONTRACT_ADDRESS = "0xb2d1BAa5fD0Ba77a6060D2D494a82EC025dA82EF";
const UPDATED_ABI_FILE_PATH = '../build/contracts/';