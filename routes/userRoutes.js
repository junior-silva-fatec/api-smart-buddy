const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Rota para obter todos os users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para obter um user por ID
router.get("/:id", getUser, (req, res) => {
  res.json(res.user);
});

// Rota para criar um novo user
router.post("/", async (req, res) => {
  const contato = new User({    
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para atualizar um user por ID
router.put("/:id", getUser, async (req, res) => {
  
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para excluir um user por ID
router.delete("/:id", getUser, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id)
    if (user == null) {
      return res.status(404).json({message: 'Usuário não encontrado'})
    }
    res.user = user;
    next()
  } catch (err) {
    return res.status(500).json({message: err.message})
  }
}

module.exports = router;
