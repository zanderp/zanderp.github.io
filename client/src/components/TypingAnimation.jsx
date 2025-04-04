import { useState, useRef, useEffect } from "react";

export const TypingAnimation = () => {
    const titles = [
        "Technical Manager",
        "Full-Stack Developer",
        "Project Manager",
        "Cybersecurity Specialist",
        "Linux Educator",
        "3D Printing Enthusiast",
        "API Designer",
        "Cloud Architect",
        "E-Commerce Specialist"
    ];

    const [currentTitle, setCurrentTitle] = useState("");
    const titleIndexRef = useRef(0);
    const charIndexRef = useRef(0);
    const isDeletingRef = useRef(false);

    const typingSpeed = () => Math.random() * 100 + 50; // Random speed between 50ms and 150ms
    const deletingSpeed = () => Math.random() * 50 + 30; // Random speed between 30ms and 80ms
    const pauseDuration = 1000; // Pause when typing completes

    const startTypingAnimation = () => {
        const typeAnimation = () => {
            const currentTitleText = titles[titleIndexRef.current];

            if (isDeletingRef.current) {
                if (charIndexRef.current > 0) {
                    charIndexRef.current--;
                    setTimeout(typeAnimation, deletingSpeed());
                } else {
                    isDeletingRef.current = false;
                    titleIndexRef.current = (titleIndexRef.current + 1) % titles.length;
                    setTimeout(typeAnimation, typingSpeed());
                }
            } else {
                if (charIndexRef.current < currentTitleText.length) {
                    charIndexRef.current++;
                    setTimeout(typeAnimation, typingSpeed());
                } else {
                    setTimeout(() => {
                        isDeletingRef.current = true;
                        typeAnimation();
                    }, pauseDuration);
                }
            }

            setCurrentTitle(currentTitleText.substring(0, charIndexRef.current));
        };

        typeAnimation();
    };

    useEffect(() => {
        startTypingAnimation();
    }, []);

    return (
        <h4 className="display-6 mb-3">{currentTitle}<span className="cursor">|</span></h4>
    );
};
