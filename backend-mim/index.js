const db = require("./config/db");
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const authRoute = require("./route/authRoute");
const guruRoute = require("./route/guruRoute");
const prestasiRoute = require("./route/prestasiRoute");
const beritaRoute = require("./route/beritaRoute");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

app.use("/api/auth", authRoute);
app.use("/api/guru", guruRoute);
app.use("/api/prestasi", prestasiRoute);
app.use("/api/berita", beritaRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
