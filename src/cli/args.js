const parseArgs = (prefix) => {
    const argv = process.argv.slice(2);
    for (let i = 0; i < argv.length; i += 2) {
        const prop = argv[i];
        const value = argv[i + 1];
        if (prop.startsWith(prefix) && value) {
            process.stdout.write(`${prop.slice(prefix.length)} is ${argv[i + 1]}${i + 1 !== argv.length - 1 ? ', ' : ''}`)
        }
    }
};

parseArgs('--');
