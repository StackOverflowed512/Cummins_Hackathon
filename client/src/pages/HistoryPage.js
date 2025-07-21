import React, { useState, useEffect } from "react";
import * as api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./HistoryPage.css";
import EmptyState from "../components/EmptyState";

const HistoryPage = () => {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        document.title = "Meal History | Nutrition Detective";

        const fetchHistory = async () => {
            try {
                const { data } = await api.getMealHistory();
                setHistory(data);
            } catch (error) {
                console.error("Failed to fetch history:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchHistory();
    }, []);

    if (isLoading) {
        return (
            <div className="history-loading">
                <div className="loading-spinner"></div>
                <p>Investigating your meal history...</p>
            </div>
        );
    }

    return (
        <div className="history-page">
            <div className="history-container glass-card">
                <div className="history-header">
                    <h2 className="gradient-text">Case Files</h2>
                    <p className="history-subtitle">
                        Your complete nutritional investigation history
                        {user && (
                            <span className="user-score">
                                ⭐ {user.score} points
                            </span>
                        )}
                    </p>
                </div>

                {history.length === 0 ? (
                    <EmptyState
                        title="No Cases Yet!"
                        subtitle="Scan your first meal to start your investigation"
                        actionText="Scan a Meal"
                        actionLink="/upload"
                    />
                ) : (
                    <div className="history-timeline">
                        {history.map((meal) => (
                            <div key={meal._id} className="history-item">
                                <div className="item-details">
                                    <div className="item-food">
                                        {meal.detectedFood}
                                    </div>
                                    <div className="item-date">
                                        {new Date(
                                            meal.createdAt
                                        ).toLocaleDateString("en-US", {
                                            weekday: "short",
                                            month: "short",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </div>
                                </div>
                                <div
                                    className={`item-score ${
                                        meal.scoreAwarded >= 0
                                            ? "positive"
                                            : "negative"
                                    }`}
                                >
                                    {meal.scoreAwarded > 0
                                        ? `+${meal.scoreAwarded}`
                                        : meal.scoreAwarded}{" "}
                                    pts
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryPage;
