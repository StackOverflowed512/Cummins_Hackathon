import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ConfettiExplosion from "react-confetti-explosion";
import Particles from "../components/Particles";
import "./ResultsPage.css";

const ResultsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isExploding, setIsExploding] = React.useState(true);
    const [showConfetti, setShowConfetti] = React.useState(true);

    useEffect(() => {
        document.title = "Results | Nutrition Detective";

        const timer = setTimeout(() => {
            setIsExploding(false);
        }, 3000);

        const confettiTimer = setTimeout(() => {
            setShowConfetti(false);
        }, 5000);

        return () => {
            clearTimeout(timer);
            clearTimeout(confettiTimer);
        };
    }, []);

    // Redirect if no result data is passed
    useEffect(() => {
        if (!location.state?.resultData) {
            navigate("/upload");
        }
    }, [location.state, navigate]);

    if (!location.state?.resultData) {
        return null;
    }

    const { meal } = location.state.resultData;

    return (
        <div className="results-page">
            {showConfetti && <Particles />}
            {isExploding && (
                <div className="confetti-container">
                    <ConfettiExplosion
                        particleCount={200}
                        duration={3000}
                        width={1600}
                        colors={["#6C5CE7", "#FD79A8", "#00CEB4", "#FFEAA7"]}
                    />
                </div>
            )}

            <div className="results-container glass-card">
                <div className="results-header">
                    <h2 className="gradient-text">Case Solved!</h2>
                    <p className="results-subtitle">
                        Your nutritional investigation results are in
                    </p>
                </div>

                <div className="result-card">
                    <div className="card-decoration"></div>
                    <h3 className="result-title">
                        I spy... a{" "}
                        <span className="food-name">{meal.detectedFood}</span>!
                    </h3>

                    <div className="nutrition-fact">
                        <div className="fact-icon">💡</div>
                        <div className="fact-content">
                            <h4>Nutritional Insight</h4>
                            <p>{meal.nutritionFact}</p>
                        </div>
                    </div>

                    <div className="score-container">
                        <div className="score-badge">
                            <span className="score-label">Points Earned</span>
                            <span className="score-points">
                                {meal.scoreAwarded}
                            </span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => navigate("/upload")}
                    className="scan-again-btn pulse"
                >
                    🔍 Scan Another Meal
                </button>
            </div>
        </div>
    );
};

export default ResultsPage;
