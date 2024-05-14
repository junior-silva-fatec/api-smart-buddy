const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user");

const JWT_SECRET = "your_jwt_secret"; // Substitua por uma string secreta segura

// Rota para login
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar se o usuário existe no banco de dados
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    // Comparar a senha fornecida com a senha armazenada no banco de dados
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    // Se as credenciais estiverem corretas, gerar um token de autenticação
    const token = generateAuthToken(user);

    // Retornar o token como resposta
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

// Função para gerar token de autenticação (um exemplo simples)
function generateAuthToken(user) {
  const payload = { userId: user._id };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

module.exports = router;
