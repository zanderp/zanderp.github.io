import React, { useRef, useEffect, useState } from "react";
import { Text } from "@react-three/drei";
import { DataService } from "../data/dataService";

export function Word({ children, fontSize, ...props }) {
    return (
        <Text
            {...props}
            fontSize={fontSize}
            color="black"
            anchorX="center"
            anchorY="middle"
        >
            {children}
        </Text>
    );
}

export function WordCloud({ hoveredSkill }) {
    const groupRef = useRef();
    const [wordData, setWordData] = useState([]);
    const [filteredWords, setFilteredWords] = useState([]);
    const occupiedCells = useRef(new Map());
    const gridResolution = 4;

    useEffect(() => {
        const fetchKeywords = async () => {
            const experience = await DataService.getWorkExperience();
            const skills = await DataService.getTopSkills();

            const experienceKeywords = experience.flatMap(item => item.technologies || []);
            const skillKeywords = skills.flatMap(skill => skill.keywords || []);

            const processedKeywords = [...experienceKeywords, ...skillKeywords].flatMap(keyword => {
                const parenthesized = keyword.match(/\((.*?)\)/);
                const extracted = parenthesized ? parenthesized[1].split(/,\s*/) : [];
                const withoutParentheses = keyword.replace(/\(.*?\)/g, "").split(/,\s*/);
                return [...withoutParentheses, ...extracted].map(k => k.trim());
            });

            const wordFrequency = processedKeywords.reduce((acc, word) => {
                acc[word] = (acc[word] || 0) + 1;
                return acc;
            }, {});

            const wordArray = Object.entries(wordFrequency).map(([word, count]) => ({
                word,
                count
            }));

            setWordData(wordArray);
        };

        fetchKeywords();
    }, []);

    useEffect(() => {
        if (hoveredSkill) {
            setFilteredWords(
                wordData.filter(word => hoveredSkill.keywords.includes(word.word))
            );
        } else {
            setFilteredWords(wordData);
        }
    }, [hoveredSkill, wordData]);

    useEffect(() => {
        const handleMouseMove = (event) => {
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 0.05;
            if (groupRef.current) {
                groupRef.current.rotation.y = x * Math.PI * 0.1;
                groupRef.current.rotation.x = y * Math.PI;
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const isOverlapping = (x, y, z, fontSize) => {
        const cellX = Math.floor(x / gridResolution);
        const cellY = Math.floor(y / gridResolution);
        const cellZ = Math.floor(z / gridResolution);
        const radius = Math.ceil((fontSize * 4) / gridResolution);

        for (let dx = -radius; dx <= radius; dx++) {
            for (let dy = -radius; dy <= radius; dy++) {
                for (let dz = -radius; dz <= radius; dz++) {
                    const key = `${cellX + dx},${cellY + dy},${cellZ + dz}`;
                    if (occupiedCells.current.has(key)) return true;
                }
            }
        }
        return false;
    };

    return (
        <group ref={groupRef}>
            {(() => {
                occupiedCells.current.clear();
                const sortedWords = [...filteredWords].sort((a, b) => b.count - a.count);

                return sortedWords.map(({ word, count }, index) => {
                    let x, y, z;
                    let attempt = 0;
                    const maxAttempts = 700;
                    const canvasBounds = {
                        x: 20.0,
                        y: 4.0,
                        z: 4.0,
                    };
                    const fontSize = 0.4 + count * 0.03;

                    do {
                        x = (Math.random() - 0.5) * canvasBounds.x * 4;
                        y = (Math.random() - 0.5) * canvasBounds.y * 4;
                        z = (Math.random() - 0.5) * canvasBounds.z * 4;

                        // Smaller central exclusion zone
                        if (Math.abs(y) < 4 && Math.abs(x) < 7) continue;
                        attempt++;
                    } while (
                        (isOverlapping(x, y, z, fontSize) ||
                            Math.abs(x) > canvasBounds.x - gridResolution ||
                            Math.abs(y) > canvasBounds.y - gridResolution ||
                            Math.abs(z) > canvasBounds.z - gridResolution) &&
                        attempt < maxAttempts
                    );

                    if (attempt < maxAttempts) {
                        const cellX = Math.floor(x / gridResolution);
                        const cellY = Math.floor(y / gridResolution);
                        const cellZ = Math.floor(z / gridResolution);
                        occupiedCells.current.set(`${cellX},${cellY},${cellZ}`, true);
                    }

                    return (
                        <Word
                            key={index}
                            position={[x, y, z]}
                            fontSize={fontSize}
                            renderOrder={-z - fontSize}
                        >
                            {word}
                        </Word>
                    );
                });
            })()}
        </group>
    );
}