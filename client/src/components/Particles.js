import React, { useEffect } from "react";
import "./Particles.css";

const Particles = () => {
    useEffect(() => {
        const createParticle = () => {
            const particle = document.createElement("div");
            particle.className = "particle";

            // Random properties
            const size = Math.random() * 10 + 5;
            const posX = Math.random() * window.innerWidth;
            const posY = Math.random() * window.innerHeight;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 5;
            const opacity = Math.random() * 0.5 + 0.1;
            const colors = [
                "rgba(108, 92, 231, 0.5)",
                "rgba(253, 121, 168, 0.5)",
                "rgba(0, 206, 180, 0.5)",
                "rgba(255, 118, 117, 0.5)",
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}px`;
            particle.style.top = `${posY}px`;
            particle.style.background = color;
            particle.style.opacity = opacity;
            particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;

            const container =
                document.querySelector(".homepage") ||
                document.querySelector(".results-page") ||
                document.querySelector(".upload-page") ||
                document.querySelector(".history-page") ||
                document.querySelector(".leaderboard-page");

            if (container) {
                container.appendChild(particle);

                // Remove particle after animation completes
                setTimeout(() => {
                    particle.remove();
                }, (duration + delay) * 1000);
            }
        };

        // Create initial particles
        for (let i = 0; i < 20; i++) {
            createParticle();
        }

        // Continuous particle creation
        const interval = setInterval(createParticle, 1000);

        return () => clearInterval(interval);
    }, []);

    return null;
};

export default Particles;
