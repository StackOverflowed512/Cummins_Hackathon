import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import ResultsPage from "./pages/ResultsPage";
import HistoryPage from "./pages/HistoryPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";
import "./App.css";

function ProtectedRoute({ children }) {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
}

function App() {
    return (
        <div className="App">
            <Navbar />
            <main className="container">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route
                        path="/upload"
                        element={
                            <ProtectedRoute>
                                <UploadPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/results"
                        element={
                            <ProtectedRoute>
                                <ResultsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/history"
                        element={
                            <ProtectedRoute>
                                <HistoryPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/leaderboard"
                        element={
                            <ProtectedRoute>
                                <LeaderboardPage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </main>
        </div>
    );
}

export default App;
