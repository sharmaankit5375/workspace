const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const correlation = require("./middlewares/correlation.middleware");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const app = express();
connectDB();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(correlation);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

module.exports = app;
