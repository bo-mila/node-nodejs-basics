import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dirName = 'files';
const fileName = 'fileToRemove.txt';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, dirName, fileName);

const isExisting = async (path) => {
    const res = await fs.promises.stat(path).then(() => true).catch(() => false);
    return res;
};

const remove = async (fileName) => {
    if (!await isExisting(fileName)) {
        throw new Error('FS operation failed');
    }
    
    await fs.promises.rm(fileName);
};

await remove(filePath);
