const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
    try {
        const topUsers = await User.find({}, "name score avatar")
            .sort({ score: -1 })
            .limit(10);
        res.status(200).json(topUsers);
    } catch (error) {
        res.status(500).json({ message: "Could not fetch leaderboard." });
    }
});

module.exports = router;
