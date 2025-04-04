import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Container, Row, Col, Spinner, Modal } from "react-bootstrap";
import Gravatar from "react-gravatar";
import { DataService } from "../data/dataService";
import { SkillPills } from "./SkillPills";
import { WordCloud } from "./Canvas";
import { TypingAnimation } from "./TypingAnimation";
import { SocialIcons } from "./SocialIcons";

export const Header = ({ showMap, setShowMap }) => {
    const [profile, setProfile] = useState(null);
    const [hoveredSkill, setHoveredSkill] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await DataService.getProfile();
            setProfile(data.profile);
        };
        fetchData();
    }, []);

    if (!profile) return <div className="text-center py-5"><Spinner animation="border" /></div>;

    return (
        <>
            <header className="profile-header position-relative" style={{ backgroundColor: "#343a40" }}>
                {/* Canvas Background */}
                <Canvas
                    style={{
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 0,
                    }}
                    camera={{ position: [0, 0, 10] }}
                >
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[5, 5, 5]} intensity={0.8} />
                    <WordCloud hoveredSkill={hoveredSkill} />
                </Canvas>

                {/* Overlay Content */}
                <Container className="content-container position-relative text-center mb-4" style={{ zIndex: 1 }}>
                    <Row className="justify-content-center">
                        <Col md={8} className="text-white">
                            <Gravatar email={profile.email} size={150} className="avatar mb-3" />
                            <h1 className="display-4 mb-3">I'm Alexandru</h1>
                            <TypingAnimation />
                            <SocialIcons onMapClick={() => setShowMap(true)} />
                        </Col>
                    </Row>
                </Container>

                {/* Mouse Icon */}
                <div
                    className="mouse-icon position-absolute bottom-0 start-50 translate-middle-x text-white"
                    style={{
                        width: "24px",
                        height: "40px",
                        border: "2px solid white",
                        borderRadius: "16px",
                    }}
                >
                    <div
                        className="mouse-wheel"
                        style={{
                            width: "6px",
                            height: "6px",
                            backgroundColor: "white",
                            borderRadius: "50%",
                            margin: "6px auto",
                            animation: "scroll 1.5s infinite",
                        }}
                    />
                </div>

                {/* Modal */}
                <Modal show={showMap} onHide={() => setShowMap(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Location</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <iframe
                            title="Location"
                            width="100%"
                            height="300"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            src={`https://server.alexandru.rocks/api/maps?q=${encodeURIComponent(profile.location)}`}
                        />
                    </Modal.Body>
                </Modal>

                {/* CSS */}
                <style>
                    {`
                @keyframes scroll {
                    0% { transform: translateY(0); opacity: 1; }
                    50% { transform: translateY(6px); opacity: 0.5; }
                    100% { transform: translateY(12px); opacity: 0; }
                }
                .mouse-icon {
                    animation: fadeIn 1s ease-in-out;
                }
                `}
                </style>
            </header>
            <SkillPills setHoveredSkill={setHoveredSkill} />
        </>
    );
};
