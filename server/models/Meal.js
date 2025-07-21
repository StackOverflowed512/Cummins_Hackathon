const mongoose = require("mongoose");
const { Schema } = mongoose;

const mealSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    imagePath: { type: String, required: true },
    detectedFood: { type: String, required: true },
    // These now come directly from the AI
    nutritionFact: { type: String, required: true },
    scoreAwarded: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Meal", mealSchema);
