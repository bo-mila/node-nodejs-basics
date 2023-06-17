import { Transform } from 'stream';

const transform = async () => {
    const reverseInputData = new Transform({
        transform(chunk, encoding, callback) {
          callback(null, chunk.toString().split("\n").join("").split("").reverse().join("") + '\n');
        },
      });
    process.stdin.pipe(reverseInputData).pipe(process.stdout);
};

await transform();
