import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { stdin, stdout } from 'process';

const fileName = 'fileToWrite.txt';
const dirName = 'files';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, dirName, fileName);

const write = async (filePath) => {
    const ws = fs.createWriteStream(filePath);
    ws.on('error', (error) => stdout.write(error.message));

    stdin.on('data', data => ws.write(data));
    stdin.on('end', (data) => {console.log(data); ws.end();});
};

await write(filePath);
