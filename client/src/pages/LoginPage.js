import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./AuthForm.css";

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData);
    };

    return (
        <div className="auth-form-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Welcome Back, Detective!</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default LoginPage;
