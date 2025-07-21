const express = require("express");
const router = express.Router();
const { uploadMeal, getMealHistory } = require("../controllers/mealController");
const auth = require("../middleware/auth");
const multer = require("multer");

// Use memory storage to forward the file buffer to the ML service
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload", auth, upload.single("mealImage"), uploadMeal);
router.get("/", auth, getMealHistory);

module.exports = router;
