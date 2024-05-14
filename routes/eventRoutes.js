const express = require("express");
const router = express.Router();
const Event = require("../models/event");

// Rota para obter todos os events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para obter um event por ID
router.get("/:id", getEvent, (req, res) => {
  res.json(res.event);
});

// Rota para criar um novo event
router.post("/", async (req, res) => {
  const event = new Event({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    duration: req.body.duration,
    time: req.body.time,
    owner: req.body.owner,
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para atualizar um event por ID
router.put("/:id", getEvent, async (req, res) => {
  if (req.body.title != null) {
    res.event.title = req.body.title;
  }
  if (req.body.description != null) {
    res.event.description = req.body.description;
  }
  if (req.body.date != null) {
    res.event.date = req.body.date;
  }
  if (req.body.duration != null) {
    res.event.duration = req.body.duration;
  }
  if (req.body.time != null) {
    res.event.time = req.body.time;
  }
  if (req.body.owner != null) {
    res.event.owner = req.body.owner;
  }

  try {
    const updatedEvent = await res.event.save();
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/// Rota para excluir um evento por ID
router.delete("/:id", getEvent, async (req, res) => {
  try {
    await res.event.deleteOne(); // Ou você pode usar findOneAndDelete()
    res.json({ message: "Evento deletado com sucesso" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

async function getEvent(req, res, next) {
  try {
    const event = await Event.findById(req.params.id);
    if (event == null) {
      return res.status(404).json({ message: "Evento não encontrado" });
    }
    res.event = event;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
