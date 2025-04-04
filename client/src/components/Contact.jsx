import { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { DataService } from "../data/dataService";
import { SocialIcons } from "./SocialIcons";

export const ContactSection = ({ setShowMap }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await DataService.getProfile();
                setProfile(data.profile);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) return <div className="text-center my-5"><Spinner animation="border" /></div>;

    return (
        <section className="contact-section py-5" id="contact">
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} className="text-center">
                        <h2 className="mb-4">Contact Me</h2>
                        <p className="mb-4">
                            Feel free to reach out to me via email, phone, or connect with me on social media. Let's collaborate or chat!
                        </p>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={8} className="text-center">
                        {/* Social Media Buttons */}
                        <div className="d-flex flex-wrap justify-content-center gap-3">
                            <SocialIcons onMapClick={() => setShowMap(true)} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
