var http = require("http");
require("dotenv/config");
var server = http.createServer(function (request, response) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Hello World Node!\nAPI Simples\n");
});

const porta = process.env.PORT;
server.listen(porta);
console.log(`Servidor iniciado em http://localhost:${porta}`);
