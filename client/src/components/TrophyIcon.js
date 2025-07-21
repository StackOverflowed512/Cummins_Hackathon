import React from "react";

const TrophyIcon = ({ place }) => {
    const color = place === 1 ? "#FFD700" : place === 2 ? "#C0C0C0" : "#CD7F32";

    return (
        <svg viewBox="0 0 24 24" width="30" height="30" fill={color}>
            <path d="M18 2c-.9 0-2 1-2 2H8c0-1-1.1-2-2-2H2v9c0 1 1 2 2 2h2.2c.4 2 1.7 3.7 4.8 4v2.1c-2.2.2-3 1.5-3 2.9v1h8v-1c0-1.4-.8-2.7-3-2.9V17c3.1-.3 4.4-2 4.8-4H20c1 0 2-1 2-2V2h-4M6 11H4V4h2v7m14 0h-2V4h2v7z" />
        </svg>
    );
};

export default TrophyIcon;
