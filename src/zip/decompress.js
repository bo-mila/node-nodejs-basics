import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import zlib from 'zlib';

const compressedFileName = 'archive.gz';
const fileName = 'fileToCompress.txt';
const dirName = 'files';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const compressedFilePath = path.join(__dirname, dirName, compressedFileName);

const decompress = async (compressedFilePath, fileName) => {
    if (!await fs.promises.stat(compressedFilePath).then(() => true).catch(() => false)) {
        throw new Error('Decompress operation failed');
    }
    
    const outputFilePath = path.join(path.dirname(compressedFilePath), fileName);
    const rs = fs.createReadStream(compressedFilePath);
    const ws = fs.createWriteStream(outputFilePath)
    const unZip = zlib.createUnzip();
    rs.pipe(unZip).pipe(ws);
};

await decompress(compressedFilePath, fileName);
