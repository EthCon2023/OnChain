const Web3 = require('web3');


// to bytes32 
const bytes32 = Web3.utils.asciiToHex('Some text here...');

console.log(bytes32);

console.log(Web3.utils.hexToAscii(bytes32))


// to bytes 
export const toBytes = (text: string): number[] => {
    const buffer = Buffer.from(text, 'utf8');
    const result = Array(buffer.length);
    for (let i = 0; i < buffer.length; ++i) {
        result[i] = buffer[i];
    }
    return result;
};


export const toText = (bytes: number[]): string => {
    let result = '';
    for (let i = 0; i < bytes.length; ++i) {
        const byte = bytes[i];
        const text = byte.toString(16);
        result += (byte < 16 ? '%0' : '%') + text;
    }
    return decodeURIComponent(result);
};

const bytes: number[] = toBytes('Some text here...');

const string = toText(bytes);

console.log(bytes);
console.log(string);

