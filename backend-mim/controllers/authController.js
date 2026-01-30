const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER (Hanya untuk membuat admin pertama kali)
const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [existing] = await db.query(
      "SELECT * FROM admins WHERE username = ?",
      [username],
    );
    if (existing.length > 0)
      return res.status(400).json({ message: "Username sudah dipakai!" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await db.query("INSERT INTO admins (username, password) VALUES (?, ?)", [
      username,
      hashedPassword,
    ]);

    res.status(201).json({ message: "Admin berhasil dibuat!" });
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
    if (rows.length === 0)
      return res
        .status(401)
        .json({ success: false, message: "Username salah!" });

    const admin = rows[0];
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "Password salah!" });
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.json({
      success: true,
      message: "Login Berhasil",
      token,
      user: { username: admin.username },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
