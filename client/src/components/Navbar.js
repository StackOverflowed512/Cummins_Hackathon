import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
            <div className="navbar-brand">
                <Link to="/">
                    <span className="gradient-text">
                        🍎 Nutrition Detective
                    </span>
                </Link>
            </div>
            <div className="navbar-links">
                {user ? (
                    <>
                        <Link to="/upload" className="nav-link">
                            <span className="hover-underline">Scan Meal</span>
                        </Link>
                        <Link to="/history" className="nav-link">
                            <span className="hover-underline">My History</span>
                        </Link>
                        <Link to="/leaderboard" className="nav-link">
                            <span className="hover-underline">Leaderboard</span>
                        </Link>
                        <div className="user-info">
                            <span className="user-name">{user.name}</span>
                            <span className="user-score pulse">
                                ⭐ {user.score}
                            </span>
                        </div>
                        <button onClick={handleLogout} className="logout-btn">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">
                            <span className="hover-underline">Login</span>
                        </Link>
                        <Link to="/signup" className="btn btn-accent">
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
