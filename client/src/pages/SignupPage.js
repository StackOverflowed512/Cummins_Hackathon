import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./AuthForm.css";

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const { signup } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(formData);
    };

    return (
        <div className="auth-form-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Join the Nutrition Detectives!</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    onChange={handleChange}
                    required
                />
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
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignupPage;
