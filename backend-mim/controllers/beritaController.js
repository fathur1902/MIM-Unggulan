const db = require("../config/db");
const fs = require("fs");
const path = require("path");

const getAllBerita = async (req, res) => {
  try {
    const query = `
            SELECT 
                id, 
                title, 
                tag, 
                DATE_FORMAT(date, '%d %M %Y') as date, 
                description as "desc", 
                image
            FROM berita 
            ORDER BY date DESC
        `;

    const [rows] = await db.query(query);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const createBerita = async (req, res) => {
  const { title, tag, date, desc } = req.body;
  const image = req.file ? req.file.filename : null;

  

  if (!title) {
    return res.status(400).json({ message: "Judul berita wajib diisi!" });
  }

  try {
    const query = `
            INSERT INTO berita (title, tag, date, description, image) 
            VALUES (?, ?, ?, ?, ?)
        `;
    const tanggalFix = date || new Date();
    const tagFix = tag || "Umum";

    await db.query(query, [title, tagFix, tanggalFix, desc, image]);

    res.status(201).json({
      message: "Berita berhasil ditambahkan!",
      data: { title, tag: tagFix, date: tanggalFix, desc, image },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBerita = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query("SELECT image FROM berita WHERE id = ?", [
      id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Berita tidak ditemukan" });
    }

    const namaGambar = rows[0].image;

    await db.query("DELETE FROM berita WHERE id = ?", [id]);

    if (namaGambar) {
      const filePath = path.join(__dirname, "../public/uploads", namaGambar);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.json({ message: "Berita berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getBeritaById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM berita WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBerita = async (req, res) => {
  const { id } = req.params;
  const { title, tag, date, desc } = req.body;

  try {
    if (req.file) {
      const image = req.file.filename;
      await db.query(
        "UPDATE berita SET title=?, tag=?, date=?, `description`=?, image=? WHERE id=?",
        [title, tag, date, desc, image, id],
      );
    } else {
      await db.query(
        "UPDATE berita SET title=?, tag=?, date=?, `description`=? WHERE id=?",
        [title, tag, date, desc, id],
      );
    }
    res.json({ message: "Berita berhasil diupdate!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBerita,
  createBerita,
  deleteBerita,
  getBeritaById,
  updateBerita,
};
