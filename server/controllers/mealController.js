const axios = require("axios");
const FormData = require("form-data");
const Meal = require("../models/Meal");
const User = require("../models/User");

exports.uploadMeal = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No image uploaded." });
    }

    try {
        // 1. Send image to our Python AI Service
        const form = new FormData();
        form.append("file", req.file.buffer, {
            filename: req.file.originalname,
            contentType: req.file.mimetype,
        });

        const mlResponse = await axios.post(process.env.ML_API_URL, form, {
            headers: form.getHeaders(),
        });

        // The ML service now returns everything we need
        const { food_label, nutrition_fact, score } = mlResponse.data;
        console.log(
            `AI Pipeline processed: ${food_label}, Fact: ${nutrition_fact}, Score: ${score}`
        );

        // 2. Create a new meal record directly from the AI's response
        const newMeal = new Meal({
            user: req.userId,
            imagePath: `uploads/${req.file.originalname}`,
            detectedFood: food_label,
            nutritionFact: nutrition_fact,
            scoreAwarded: score,
        });
        await newMeal.save();

        // 3. Update user's total score
        const user = await User.findById(req.userId);
        user.score += score;
        await user.save();

        // 4. Send the result to the frontend
        res.status(201).json({
            meal: newMeal,
            updatedScore: user.score,
        });
    } catch (error) {
        console.error("Error in uploadMeal:", error.message);
        if (error.response) {
            console.error("AI service error data:", error.response.data);
            return res
                .status(500)
                .json({ message: "Error communicating with the AI service." });
        }
        res.status(500).json({
            message: "Server error during meal processing.",
        });
    }
};

exports.getMealHistory = async (req, res) => {
    try {
        const meals = await Meal.find({ user: req.userId }).sort({
            createdAt: -1,
        });
        res.status(200).json(meals);
    } catch (error) {
        res.status(500).json({ message: "Could not fetch meal history." });
    }
};
