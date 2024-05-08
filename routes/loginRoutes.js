const express = require('express');
const router = express.Router();
//const bcrypt = require('bcrypt'); 
const User = require('../models/user'); 

// Rota para login
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar se o usuário existe no banco de dados
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }


    //TODO Validação da senha
    // Comparar a senha fornecida com a senha armazenada no banco de dados
    const isPasswordValid = await (password, user.password);
    //const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }


    // Se as credenciais estiverem corretas, retornar um token de autenticação (você precisará implementar isso)
    const token = generateAuthToken(user); // Você precisa implementar a geração do token

    // Retornar o token como resposta
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Função para gerar token de autenticação (um exemplo simples)
function generateAuthToken(user) {
  // Aqui você pode usar uma biblioteca como jsonwebtoken para gerar um token JWT
  // Por simplicidade, estou apenas retornando um token fictício com o ID do usuário
  return 'faketoken123';
}

module.exports = router;
