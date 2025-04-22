const { db } = require("../db");
const path = require("path");

const getAll = async (req, res) => {
  try {
    const planets = await db.any("SELECT * FROM planets");
    res.json(planets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOneById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const planet = await db.oneOrNone("SELECT * FROM planets WHERE id=$1", [id]);
    if (!planet) return res.status(404).json({ message: "Pianeta non trovato" });
    res.json(planet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const create = async (req, res) => {
  const { name } = req.body;
  try {
    await db.none("INSERT INTO planets (name) VALUES ($1)", [name]);
    res.status(201).json({ message: "Pianeta creato" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateById = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  try {
    const result = await db.result("UPDATE planets SET name=$2 WHERE id=$1", [id, name]);
    if (result.rowCount === 0) return res.status(404).json({ message: "Pianeta non trovato" });
    res.json({ message: "Pianeta aggiornato" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await db.result("DELETE FROM planets WHERE id=$1", [id]);
    if (result.rowCount === 0) return res.status(404).json({ message: "Pianeta non trovato" });
    res.json({ message: "Pianeta eliminato" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const uploadImage = async (req, res) => {
  const id = parseInt(req.params.id);
  const filePath = req.file.path;

  try {
    const result = await db.result("UPDATE planets SET image=$2 WHERE id=$1", [id, filePath]);
    if (result.rowCount === 0) return res.status(404).json({ message: "Pianeta non trovato" });
    res.json({ message: "Immagine caricata", path: filePath });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
  uploadImage
};