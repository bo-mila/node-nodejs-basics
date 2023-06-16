import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dirName = 'files';
const fromFileName = 'wrongFilename.txt';
const toFileName = 'properFilename.md';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fromFilePath = path.join(__dirname, dirName, fromFileName);
const toFilePath = path.join(__dirname, dirName, toFileName);

const isExisting = async (path) => {
    const res = await fs.promises.stat(path).then(() => true).catch(() => false);
    return res;
};

const rename = async (fromFile, toFile) => {
    if (!await isExisting(fromFile) || await isExisting(toFile)) {
        throw new Error('FS operation failed');
    }
    
    await fs.promises.rename(fromFile, toFile);
};

await rename(fromFilePath, toFilePath);
