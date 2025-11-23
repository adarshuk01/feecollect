import express from "express";
import cors from "cors";
import uploadExcelRoute from "./uploadExcel.js";

const app = express();

// ✅ Enable CORS for all origins (or restrict to your frontend)
app.use(cors({
  origin: "*", // frontend URL
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));

// Middleware
app.use(express.json());

// Routes
app.use("/api", uploadExcelRoute);

// Server Start
app.listen(5000, () => console.log("✅ Server running on port 5000"));
