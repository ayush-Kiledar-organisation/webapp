const Logger = require('node-json-logger');
const fs = require('fs');

const logStream = fs.createWriteStream('./myapp.log', { flags: 'a' });
const logger = new Logger({ stream: logStream });

process.stdout.write = logStream.write.bind(logStream);
process.stderr.write = logStream.write.bind(logStream);

module.exports = logger;