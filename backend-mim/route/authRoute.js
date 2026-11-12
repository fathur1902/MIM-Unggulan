const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const verifyToken = require("../middleware/authMiddleware"); // Satpam Login

router.post("/login", authController.login);
router.post("/register", verifyToken, authController.register); // Proteksi agar hanya admin login yang bisa tambah admin
router.get("/admins", verifyToken, authController.getAllAdmins);
router.put("/admins/:id", verifyToken, authController.updateAdmin);
router.delete("/admins/:id", verifyToken, authController.deleteAdmin);
module.exports = router;
