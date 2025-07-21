require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const mealRoutes = require("./routes/mealRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const { seedNutritionData } = require("./seed/nutritionSeeder");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

// Database Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        // Seed the database with nutrition facts if it's empty
        seedNutritionData();

        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });
