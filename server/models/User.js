const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    score: { type: Number, default: 0 },
    avatar: { type: String, default: "default_avatar.png" }, // Simple default
});

module.exports = mongoose.model("User", userSchema);
