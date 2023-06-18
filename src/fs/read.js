import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dirName = 'files';
const fileName = 'fileToRead.txt';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, dirName, fileName);

const isExisting = async (path) => {
    const res = await fs.promises.stat(path).then(() => true).catch(() => false);
    return res;
};

const read = async (filePath) => {
    if (!await isExisting(filePath)) {
        throw new Error('FS operation failed');
    }
    
    const rs = fs.createReadStream(filePath);
    for await (let chunk of rs) {
        process.stdout.write(chunk);
    }
};

await read(filePath);
