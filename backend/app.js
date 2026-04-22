import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";

import authenticateUser from "./middlewares/authenticateUser.js";

// Load environment variables
dotenv.config();

// App Configuration
const PORT = process.env.PORT || 5000;
const app = express();

// --- Middlewares ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// --- CORS Configuration ---
// This handles everything. No need for the manual middleware below it.
app.use(cors({
  origin: [
    "http://localhost:5173", 
    "https://spend-smart-dev.vercel.app"
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// --- Routes ---
// Base route for health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/incomes", authenticateUser, incomeRoutes);
app.use("/api/v1/expenses", authenticateUser, expenseRoutes);

// --- Error Handling for 404s ---
// This catch-all ensures that if a route doesn't exist, you get a clean JSON error
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// --- Start Server ---
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server started on PORT ${PORT}!`);
    });
  } catch (error) {
    console.log(`❌ Error in starting the server: ${error.message}`);
    process.exit(1);
  }
};

startServer();