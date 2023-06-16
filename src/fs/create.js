import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const fileName = 'fresh.txt';
const dirName = 'files';
const content = 'I am fresh and young';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, dirName, fileName);

const create = async (path, content) => {
    if (await fs.promises.stat(path).then(() => true).catch(() => false)) {
        throw new Error('FS operation failed');
    }

    const ws = fs.createWriteStream(path);
    ws.write(content);
};

await create(filePath, content);
