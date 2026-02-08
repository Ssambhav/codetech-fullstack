// backend/server.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import allRoutes from "./routes/allRoutes.js";
import "./jobs/autoRefresh.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares 
app.use(
  cors({
    origin: ["http://localhost:5173", "https://know-my-rights.netlify.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.get("/", (_, res) => {
  res.send("KnowMyRights API is running ✅");
});

app.use("/api", allRoutes);

// Server start
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

app.use((req, res) => {
  res.status(404).json({ message: "🔍 API route not found" });
});
