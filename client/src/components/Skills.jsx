import { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Badge, ProgressBar } from 'react-bootstrap';
import { DataService } from '../data/dataService';

export const Skills = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const data = await DataService.getSkills(); // Fetch the skills data
                setSkills(data || []);
            } finally {
                setLoading(false);
            }
        };
        fetchSkills();
    }, []);

    if (loading) return <div className="text-center my-5"><Spinner animation="border" /></div>;

    return (
        <section className="py-5 bg-light text-dark skills-section" id="skills">
            <Container>
                <Row className="justify-content-center">
                    <Col md={10} className="text-center">
                        <h2 className="mb-4">My Expertise</h2>
                        <p className="text-muted mb-5">
                            Here are some of the areas where I excel, showcasing my technical skills and capabilities.
                            Each skill is complemented by specific tools and technologies I've mastered.
                        </p>
                    </Col>
                </Row>
                <Row xs={1} md={2} lg={2} className="g-4">
                    {skills.map((skill, index) => (
                        <Col key={index}>
                            <div className="skill-card p-4 shadow-sm h-100">
                                <h5 className="mb-3">{skill.name}</h5>
                                <ProgressBar
                                    now={(skill.relevance / 10) * 100}
                                    label={`${skill.relevance * 10}%`}
                                    className="mb-4"
                                />
                                <div className="d-flex flex-wrap gap-2">
                                    {skill.keywords.map((keyword, kIndex) => (
                                        <Badge key={kIndex} bg="dark" className="px-3 py-2">
                                            {keyword}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};
