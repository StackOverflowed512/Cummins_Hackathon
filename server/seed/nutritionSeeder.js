const NutritionFact = require("../models/NutritionFact");

const nutritionData = [
    {
        foodName: "apple",
        fact: "Apples help keep your teeth clean and your gums healthy!",
        score: 5,
    },
    {
        foodName: "banana",
        fact: "Bananas give you super energy to play and run!",
        score: 4,
    },
    {
        foodName: "pizza",
        fact: "Pizza can have yummy veggies, but is best as a sometimes treat!",
        score: 1,
    },
    {
        foodName: "broccoli",
        fact: "Broccoli has Vitamin C to help you fight off colds!",
        score: 7,
    },
    {
        foodName: "strawberry",
        fact: "Strawberries are full of power to help your body heal cuts!",
        score: 6,
    },
    {
        foodName: "french fries",
        fact: "Fries are tasty, but too many can make you feel slow.",
        score: 0,
    },
    {
        foodName: "hamburger",
        fact: "Hamburgers have protein to build strong muscles!",
        score: 2,
    },
    {
        foodName: "ice cream",
        fact: "Ice cream is a sweet treat for special occasions!",
        score: -1,
    },
    {
        foodName: "carrot",
        fact: "Carrots help you see better in the dark, like a superhero!",
        score: 6,
    },
    {
        foodName: "orange",
        fact: "Oranges are packed with Vitamin C to keep you from getting sick!",
        score: 5,
    },
    {
        foodName: "spinach",
        fact: "Spinach makes you strong like a superhero!",
        score: 8,
    },
    {
        foodName: "hot dog",
        fact: "Hot dogs are fun for a BBQ, but not an everyday food.",
        score: 0,
    },
    {
        foodName: "donut",
        fact: "Donuts are sugary and should be a rare treat!",
        score: -2,
    },
    {
        foodName: "waffle",
        fact: "Waffles can be a great breakfast, especially with fruit!",
        score: 2,
    },
    {
        foodName: "cup cake",
        fact: "Cupcakes are delicious for birthdays!",
        score: -1,
    },
];

const seedNutritionData = async () => {
    try {
        const count = await NutritionFact.countDocuments();
        if (count === 0) {
            console.log("No nutrition facts found. Seeding database...");
            await NutritionFact.insertMany(nutritionData);
            console.log("Nutrition data seeded successfully!");
        } else {
            console.log("Nutrition data already exists. Skipping seed.");
        }
    } catch (error) {
        console.error("Error seeding nutrition data:", error);
    }
};

module.exports = { seedNutritionData };
