import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import Particles from "../components/Particles";

const HomePage = () => {
    useEffect(() => {
        document.title = "Nutrition Detective | Discover Food Secrets";
    }, []);

    return (
        <div className="homepage">
            <Particles />
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="gradient-text">Uncover Food Mysteries 🕵️‍♀️</h1>
                    <p className="hero-subtitle">
                        Scan meals, unlock nutrition secrets, and climb the
                        leaderboard in this delicious detective adventure!
                    </p>
                    <Link to="/signup" className="cta-button pulse">
                        Start Detecting Now →
                    </Link>
                </div>
                <div className="hero-illustration float"></div>
            </section>

            <section className="features-section">
                <div className="section-header">
                    <h2>How It Works</h2>
                    <p>
                        Become a top nutrition detective in three simple steps
                    </p>
                </div>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">📸</div>
                        <h3>Snap & Scan</h3>
                        <p>
                            Capture your meal with your camera or upload an
                            existing photo to begin your investigation.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🧠</div>
                        <h3>Discover Secrets</h3>
                        <p>
                            Unlock fascinating nutrition facts and health
                            insights about your food choices.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🏆</div>
                        <h3>Earn Rewards</h3>
                        <p>
                            Gain points for healthy discoveries and compete on
                            the global leaderboard.
                        </p>
                    </div>
                </div>
            </section>

            <section className="testimonials">
                <div className="section-header">
                    <h2>Trusted by Food Detectives Worldwide</h2>
                </div>
                <div className="testimonial-cards">
                    <div className="testimonial-card glass-card">
                        <p>
                            "Nutrition Detective transformed how I think about
                            food. I've discovered so many fascinating facts!"
                        </p>
                        <div className="testimonial-author">- Sarah K.</div>
                    </div>
                    <div className="testimonial-card glass-card">
                        <p>
                            "The gamification makes healthy eating fun. My kids
                            love earning points!"
                        </p>
                        <div className="testimonial-author">- Michael T.</div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
