import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import zlib from 'zlib';

const fileName = 'fileToCompress.txt';
const compressedFileName = 'archive.gz';
const dirName = 'files';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, dirName, fileName);

const compress = async (filePath, compressedFileName) => {
    if (!await fs.promises.stat(filePath).then(() => true).catch(() => false)) {
        throw new Error('Compress operation failed');
    }
    
    const outputFilePath = path.join(path.dirname(filePath), compressedFileName);
    const rs = fs.createReadStream(filePath);
    const ws = fs.createWriteStream(outputFilePath)
    const zip = zlib.createGzip();
    rs.pipe(zip).pipe(ws);
};

await compress(filePath, compressedFileName);
