import React from "react";
import { Link } from "react-router-dom";
import "./EmptyState.css";

const EmptyState = ({ title, subtitle, actionText, actionLink }) => {
    return (
        <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3 className="empty-title">{title}</h3>
            <p className="empty-subtitle">{subtitle}</p>
            {actionText && actionLink && (
                <Link to={actionLink} className="empty-action">
                    {actionText}
                </Link>
            )}
        </div>
    );
};

export default EmptyState;
