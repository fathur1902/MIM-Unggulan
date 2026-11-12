const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER / TAMBAH ADMIN BARU
const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username dan password wajib diisi!" });
  }

  try {
    const [existing] = await db.query(
      "SELECT id FROM admins WHERE username = ?",
      [username]
    );
    if (existing.length > 0) {
      return res.status(400).json({ message: "Username sudah dipakai!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await db.query("INSERT INTO admins (username, password) VALUES (?, ?)", [
      username,
      hashedPassword,
    ]);

    res.status(201).json({ message: "Admin berhasil ditambahkan!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query("SELECT * FROM admins WHERE username = ?", [
      username,
    ]);
    if (rows.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Username salah!" });
    }

    const admin = rows[0];
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Password salah!" });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      message: "Login Berhasil",
      token,
      user: { id: admin.id, username: admin.username },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// AMBIL SEMUA DAFTAR ADMIN (Tanpa menampilkan hash password)
const getAllAdmins = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, username FROM admins ORDER BY id ASC"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// EDIT ADMIN (Username & Opsional Password Baru)
const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username tidak boleh kosong!" });
  }

  try {
    // Cek apakah username sudah dipakai oleh admin lain
    const [existing] = await db.query(
      "SELECT id FROM admins WHERE username = ? AND id != ?",
      [username, id]
    );
    if (existing.length > 0) {
      return res.status(400).json({ message: "Username sudah digunakan admin lain!" });
    }

    // Jika password diisi, update username + password baru
    if (password && password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await db.query(
        "UPDATE admins SET username = ?, password = ? WHERE id = ?",
        [username, hashedPassword, id]
      );
    } else {
      // Jika password kosong, update username saja
      await db.query("UPDATE admins SET username = ? WHERE id = ?", [
        username,
        id,
      ]);
    }

    res.json({ message: "Data admin berhasil diperbarui!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// HAPUS ADMIN
const deleteAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    // Cegah penghapusan jika hanya tersisa 1 akun admin
    const [countRows] = await db.query("SELECT COUNT(*) as total FROM admins");
    if (countRows[0].total <= 1) {
      return res
        .status(400)
        .json({ message: "Minimal harus tersisa 1 akun admin!" });
    }

    // Cegah admin menghapus akunnya sendiri yang sedang dipakai login
    if (req.user && String(req.user.id) === String(id)) {
      return res
        .status(400)
        .json({ message: "Tidak dapat menghapus akun yang sedang digunakan login!" });
    }

    await db.query("DELETE FROM admins WHERE id = ?", [id]);
    res.json({ message: "Akun admin berhasil dihapus!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
};