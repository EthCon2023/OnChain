const toBytes = (text: string): number[] => {
    const buffer = Buffer.from(text, 'utf8');
    const result = Array(buffer.length);
    for (let i = 0; i < buffer.length; ++i) {
        result[i] = buffer[i];
    }
    return result;
};


const toText = (bytes: number[]): string => {
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
console.log(string)