import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const fileName = 'fileToCalculateHashFor.txt';
const dirName = 'files';
const hashName = 'sha256';
const encodingName = 'hex';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, dirName, fileName);

const calculateHash = async (filePath, hashName, encodingName) => {
    fs.createReadStream(filePath)
        .pipe(crypto.createHash(hashName))
        .setEncoding(encodingName)
        .pipe(process.stdout)
};

await calculateHash(filePath, hashName, encodingName);
