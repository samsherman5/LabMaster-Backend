const http = require('http');
const app = require('./app');

const port = parseInt(process.env.PORT) || 3000;
const server = http.createServer(app);

server.listen(port);

console.log("Express is loaded and listening");
