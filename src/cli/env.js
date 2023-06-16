const parseEnv = (prefix) => {
    process.stdout.write(Object.entries(process.env)
        .filter(([prop, _]) => prop.startsWith(prefix))
        .map(([prop, value]) => `${prop}=${value}`)
        .join('; ')
    );
};

parseEnv('RSS_');
