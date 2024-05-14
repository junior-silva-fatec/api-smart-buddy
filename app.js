const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

const app = express();
app.use(express.json());

const corsOptions = {
  origin: [process.env.URL_REACT_LOCAL, process.env.URL_REACT_ONLINE],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const userRouter = require("./routes/userRoutes");
app.use("/users", userRouter);
const eventRouter = require("./routes/eventRoutes");
app.use("/events", eventRouter);
const loginRouter = require("./routes/loginRoutes");
app.use("/login", loginRouter);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Erro de conexão ao MongoDB"));
db.once("open", () => {
  console.log("Conectado ao MongoDB Atlas!");
});

app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
