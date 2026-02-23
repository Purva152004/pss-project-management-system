require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const User = require("./models/User");

const app = express();

/* MIDDLEWARE */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://pss-project-management-system.vercel.app"
    ],
    credentials: true,
  })
);
app.use(express.json());

/* ROUTES */
app.use("/api/auth", require("./routes/auth"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/employee", require("./routes/employee"));
app.use("/api/client", require("./routes/client"));
app.use("/api/services", require("./routes/service"));
app.use("/api/notifications", require("./routes/notification"));

/* DATABASE CONNECT */
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");

    const adminExists = await User.findOne({ role: "admin" });

    if (!adminExists) {
      const hashed = await bcrypt.hash("admin123", 10);

      await User.create({
        name: "Super Admin",
        email: "admin@pss.com",
        password: hashed,
        role: "admin",
      });

      console.log("Admin Seeded");
    }
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

/* SERVER */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});