import path from 'path';
import { fileURLToPath } from 'url';
import { Worker } from 'worker_threads';
import os from 'os';

const workerFileName = 'worker.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workerFilePath = path.join(__dirname, workerFileName);
const number = 10;

const performCalculations = async (number, workerFile) => {
    
    const cpuCount = os.cpus().length;
    const workers = [];
    for (let i = 0; i <= cpuCount; i++) {
        workers.push(new Promise((res, rej) => {
            const worker = new Worker(workerFile, { workerData: number + i });
            worker.on('message', (result) => res(result));
            worker.on('error', (error) => rej(error));
            worker.on('exit', () => {});
        }))
    }
    const workersResult = (await Promise.allSettled(workers)).map(({ status, value }) => ({
        status: status === 'fulfilled' ? 'resolved' : 'error',
        data: status === 'fulfilled' ? value : null,
    }));
    console.log(workersResult);
};

await performCalculations(number, workerFilePath);
