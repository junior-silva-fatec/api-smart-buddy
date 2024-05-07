const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");

var http = require("http");

const app = express();
app.use(express.json());

/* var server = http.createServer(function (request, response) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Hello World Node!\n");
});

const porta = process.env.PORT;
server.listen(porta);
console.log(`Servidor iniciado em http://localhost:${porta}`); */

const userRouter = require("./routes/userRoutes");
app.use("/users", userRouter);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Erro de conexão ao MongoDB"));
db.once("open", () => {
  console.log("Conectado ao MongoDB Atlas!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});