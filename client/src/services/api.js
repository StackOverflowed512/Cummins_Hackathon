import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080/api" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem("profile")).token
        }`;
    }
    return req;
});

// Auth
export const login = (formData) => API.post("/auth/login", formData);
export const signup = (formData) => API.post("/auth/signup", formData);

// Meals
export const uploadMeal = (formData) =>
    API.post("/meals/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
export const getMealHistory = () => API.get("/meals");

// Leaderboard
export const getLeaderboard = () => API.get("/leaderboard");
