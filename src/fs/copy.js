import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const fromDirName = 'files';
const toDirName = 'files_copy';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fromDirPath = path.join(__dirname, fromDirName);
const toDirPath = path.join(__dirname, toDirName);

const isExisting = async (path) => {
    const res = await fs.promises.stat(path).then(() => true).catch(() => false);
    return res;
};

const copyFile = async (fromPath, toPath) => {
    const ws = fs.createWriteStream(toPath);
    const rs = fs.createReadStream(fromPath, 'utf-8');
    for await (const chunk of rs) {
        ws.write(chunk);
    }
};

const copy = async (fromPath, toPath) => {
    if (await isExisting(toPath)) {
        throw new Error('FS operation failed');
    }
    
    await fs.promises.mkdir(toPath, { recursive: true });
    
    const files = await fs.promises.readdir(fromPath, { withFileTypes: true });
    files.forEach(async (fileObject) => {
        const fromFilePath = path.join(fromDirPath, fileObject.name);
        const toFilePath = path.join(toDirPath, fileObject.name);
        
        if (fileObject.isFile()) {
            await copyFile(fromFilePath, toFilePath);
        }
        else {
            await copy(fromFilePath, toFilePath);
        }
    });
};

await copy(fromDirPath, toDirPath);
