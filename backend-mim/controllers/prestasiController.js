const db = require("../config/db");
const fs = require("fs");
const path = require("path");

const getAllPrestasi = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM prestasi ORDER BY created_at DESC",
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPrestasi = async (req, res) => {
  const { title, ranking, level, description } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    await db.query(
      "INSERT INTO prestasi (title, ranking, level, description, image) VALUES (?, ?, ?, ?, ?)",
      [title, ranking, level, description, image],
    );
    res.status(201).json({ message: "Prestasi berhasil ditambahkan!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePrestasi = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT image FROM prestasi WHERE id = ?", [
      id,
    ]);
    if (rows.length > 0 && rows[0].image) {
      const filePath = path.join(__dirname, "../public/uploads", rows[0].image);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    await db.query("DELETE FROM prestasi WHERE id = ?", [id]);
    res.json({ message: "Prestasi berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getPrestasiById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM prestasi WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePrestasi = async (req, res) => {
  const { id } = req.params;
  const { title, ranking, level, description } = req.body;

  try {
    if (req.file) {
      const image = req.file.filename;
      await db.query(
        "UPDATE prestasi SET title=?, ranking=?, level=?, description=?, image=? WHERE id=?",
        [title, ranking, level, description, image, id],
      );
    } else {
      await db.query(
        "UPDATE prestasi SET title=?, ranking=?, level=?, description=? WHERE id=?",
        [title, ranking, level, description, id],
      );
    }
    res.json({ message: "Prestasi berhasil diupdate!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPrestasi,
  createPrestasi,
  deletePrestasi,
  getPrestasiById,
  updatePrestasi,
};
