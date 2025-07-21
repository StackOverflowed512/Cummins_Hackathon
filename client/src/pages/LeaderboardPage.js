import React, { useState, useEffect } from "react";
import * as api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./LeaderboardPage.css";
import TrophyIcon from "../components/TrophyIcon";

const LeaderboardPage = () => {
    const [leaders, setLeaders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        document.title = "Leaderboard | Nutrition Detective";

        const fetchLeaderboard = async () => {
            try {
                const { data } = await api.getLeaderboard();
                setLeaders(data);
            } catch (error) {
                console.error("Failed to fetch leaderboard:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchLeaderboard();
    }, []);

    if (isLoading) {
        return (
            <div className="leaderboard-loading">
                <div className="loading-spinner"></div>
                <p>Gathering top detectives...</p>
            </div>
        );
    }

    return (
        <div className="leaderboard-page">
            <div className="leaderboard-container glass-card">
                <div className="leaderboard-header">
                    <h2 className="gradient-text">Top Detectives</h2>
                    <p className="leaderboard-subtitle">
                        The highest scoring nutrition investigators
                        {user && (
                            <span className="user-rank">
                                Your rank: #
                                {leaders.findIndex((u) => u._id === user._id) +
                                    1 || "--"}
                            </span>
                        )}
                    </p>
                </div>

                <div className="leaderboard-list">
                    {leaders.slice(0, 10).map((user, index) => (
                        <div
                            key={user._id}
                            className={`leaderboard-item ${
                                index < 3 ? "podium" : ""
                            }`}
                        >
                            <div className="leader-rank">
                                {index < 3 ? (
                                    <TrophyIcon place={index + 1} />
                                ) : (
                                    <span>#{index + 1}</span>
                                )}
                            </div>
                            <div className="leader-info">
                                <div className="leader-name">{user.name}</div>
                                {user._id === user?._id && (
                                    <div className="you-badge">You</div>
                                )}
                            </div>
                            <div className="leader-score">
                                <span>{user.score}</span>
                                <span className="points-text">points</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LeaderboardPage;
