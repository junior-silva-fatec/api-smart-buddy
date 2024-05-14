const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv/config");

const app = express();
app.use(express.json());

const urlReactLocal = "http://localhost:5173"
const urlReactRemoto = "https://smart-buddy.vercel.app"

const corsOptions = {
  //origin: [process.env.URL_REACT_LOCAL, process.env.URL_REACT_ONLINE], // Inclua a URL do frontend online
  origin: [urlReactLocal, urlReactRemoto], // Inclua a URL do frontend online
  optionsSuccessStatus: 200 // Algumas versões do CORS exigem isso
};
app.use(cors(corsOptions));

//app.use(cors());

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
