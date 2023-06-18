import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const fileName = 'fileToRead.txt';
const dirName = 'files';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, dirName, fileName);

const read = async (filePath) => {
    fs.createReadStream(filePath)
        .pipe(process.stdout);
};

await read(filePath);
