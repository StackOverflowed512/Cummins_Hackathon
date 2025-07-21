import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../services/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedProfile = localStorage.getItem("profile");
        if (storedProfile) {
            setUser(JSON.parse(storedProfile));
        }
    }, []);

    const login = async (formData) => {
        try {
            const { data } = await api.login(formData);
            localStorage.setItem("profile", JSON.stringify(data));
            setUser(data);
            navigate("/upload");
        } catch (error) {
            console.error(error);
            alert(error.response.data.message);
        }
    };

    const signup = async (formData) => {
        try {
            const { data } = await api.signup(formData);
            localStorage.setItem("profile", JSON.stringify(data));
            setUser(data);
            navigate("/upload");
        } catch (error) {
            console.error(error);
            alert(error.response.data.message);
        }
    };

    const logout = () => {
        localStorage.removeItem("profile");
        setUser(null);
        navigate("/login");
    };

    const updateUserScore = (newScore) => {
        if (user) {
            const updatedProfile = {
                ...user,
                result: { ...user.result, score: newScore },
            };
            localStorage.setItem("profile", JSON.stringify(updatedProfile));
            setUser(updatedProfile);
        }
    };

    const value = { user, login, signup, logout, updateUserScore };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
