import cp from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { Worker } from 'worker_threads';
import os from 'os';

const cpFileName = 'script.js';
const dirName = 'files';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cpFilePath = path.join(__dirname, dirName, cpFileName);

const spawnChildProcess = async (args, cpFile) => {
    
    const worker = cp.fork(cpFile, args);
    worker.on('error', () => process.exit(0));
};

spawnChildProcess( [1, 2], cpFilePath);
