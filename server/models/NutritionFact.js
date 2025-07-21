const mongoose = require("mongoose");
const { Schema } = mongoose;

// This collection stores the gamification data
const nutritionFactSchema = new Schema({
    foodName: { type: String, required: true, unique: true, lowercase: true },
    fact: { type: String, required: true },
    score: { type: Number, required: true },
});

module.exports = mongoose.model("NutritionFact", nutritionFactSchema);
