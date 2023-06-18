import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dirName = 'files';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dirPath = path.join(__dirname, dirName);

const isExisting = async (path) => {
    const res = await fs.promises.stat(path).then(() => true).catch(() => false);
    return res;
};

const list = async (dirPath) => {
    if (!await isExisting(dirPath)) {
        throw new Error('FS operation failed');
    }
    
    const files = await fs.promises.readdir(dirPath);
    console.log(files.join('\n'));
};

await list(dirPath);
