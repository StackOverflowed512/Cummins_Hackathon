import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../services/api";
import { useAuth } from "../context/AuthContext";
import Particles from "../components/Particles";
import "./UploadPage.css";

const UploadPage = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const navigate = useNavigate();
    const fileInputRef = useRef();
    const { updateUserScore } = useAuth();

    useEffect(() => {
        document.title = "Scan Your Meal | Nutrition Detective";
    }, []);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files.length) {
            handleFileChange({ target: { files } });
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type.match("image.*")) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setError("");
        } else {
            setError("Please select a valid image file (JPEG, PNG)");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError("Please select an image first!");
            return;
        }

        setIsLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("mealImage", file);

        try {
            const { data } = await api.uploadMeal(formData);
            updateUserScore(data.updatedScore);
            navigate("/results", { state: { resultData: data } });
        } catch (err) {
            const errorMessage =
                err.response?.data?.message ||
                "Something went wrong. Please try again.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="upload-page">
            <Particles />
            <div className="upload-container glass-card">
                <div className="upload-header">
                    <h2 className="gradient-text">Scan Your Meal</h2>
                    <p>Upload a photo to uncover its nutritional secrets</p>
                </div>

                <form onSubmit={handleSubmit} className="upload-form">
                    <div
                        className={`drop-zone ${isDragging ? "dragging" : ""} ${
                            preview ? "has-preview" : ""
                        }`}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current.click()}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                            style={{ display: "none" }}
                        />

                        {preview ? (
                            <div className="image-preview-container">
                                <img
                                    src={preview}
                                    alt="Meal preview"
                                    className="image-preview"
                                />
                                <div className="preview-overlay">
                                    <span>Click to change image</span>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="upload-icon">
                                    <svg
                                        viewBox="0 0 24 24"
                                        width="48"
                                        height="48"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M8,15V17H16V15H8M8,11V13H16V11H8Z"
                                        />
                                    </svg>
                                </div>
                                <p className="drop-text">
                                    Drag & drop your meal photo here
                                </p>
                                <p className="drop-subtext">
                                    or click to browse files
                                </p>
                            </>
                        )}
                    </div>

                    {isLoading ? (
                        <div className="upload-loading">
                            <div className="loading-spinner"></div>
                            <p>Analyzing your meal... 🔍</p>
                        </div>
                    ) : (
                        file && (
                            <button type="submit" className="analyze-btn pulse">
                                Discover Nutrition Secrets
                            </button>
                        )
                    )}

                    {error && (
                        <div className="upload-error">
                            <svg viewBox="0 0 24 24" width="24" height="24">
                                <path
                                    fill="currentColor"
                                    d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16"
                                />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default UploadPage;
