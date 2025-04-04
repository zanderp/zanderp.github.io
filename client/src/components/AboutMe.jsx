import { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { DataService } from '../data/dataService';

export const AboutMe = () => {
    const [aboutMe, setAboutMe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAboutMe = async () => {
            try {
                const data = await DataService.getAboutMe();
                setAboutMe(data.description);
            } finally {
                setLoading(false);
            }
        };
        fetchAboutMe();
    }, []);

    if (loading) return <div className="text-center my-5"><Spinner animation="border" /></div>;

    return (
        <section className="py-5 bg-white text-dark about-card" id="about">
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} className="text-center">
                        <h2 className="mb-4">About Me</h2>
                        {aboutMe && aboutMe.split('\n\n').map((paragraph, index) => (
                            <p key={index} className="mb-3">
                                {paragraph}
                            </p>
                        ))}
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
