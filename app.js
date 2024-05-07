const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");

var http = require("http");

const app = express();
app.use(express.json());

var server = http.createServer(function (request, response) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Hello World Node!\n");
});

const porta = process.env.PORT;
server.listen(porta);
console.log(`Servidor iniciado em http://localhost:${porta}`);