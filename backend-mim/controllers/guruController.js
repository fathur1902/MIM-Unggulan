const db = require("../config/db");
const fs = require("fs");
const path = require("path");

const getAllGuru = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM guru ORDER BY id ASC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createGuru = async (req, res) => {
  const { name, role, description } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    await db.query(
      "INSERT INTO guru (name, role, description, image) VALUES (?, ?, ?, ?)",
      [name, role, description, image],
    );
    res.status(201).json({ message: "Data Kafilah berhasil ditambahkan!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteGuru = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT image FROM guru WHERE id = ?", [id]);
    if (rows.length > 0 && rows[0].image) {
      const filePath = path.join(__dirname, "../public/uploads", rows[0].image);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    await db.query("DELETE FROM guru WHERE id = ?", [id]);
    res.json({ message: "Data berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getGuruById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM guru WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateGuru = async (req, res) => {
  const { id } = req.params;
  const { name, role, description } = req.body;

  try {
    if (req.file) {
      const image = req.file.filename;
      await db.query(
        "UPDATE guru SET name=?, role=?, description=?, image=? WHERE id=?",
        [name, role, description, image, id],
      );
    } else {
      await db.query(
        "UPDATE guru SET name=?, role=?, description=? WHERE id=?",
        [name, role, description, id],
      );
    }
    res.json({ message: "Data Guru berhasil diupdate!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllGuru,
  createGuru,
  deleteGuru,
  getGuruById,
  updateGuru,
};
