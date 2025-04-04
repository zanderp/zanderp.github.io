import { useState, useEffect } from 'react';
import { Modal, Card, Row, Col, Badge, Spinner, Container } from 'react-bootstrap';
import { DataService } from '../data/dataService';

export const Education = () => {
    const [selectedEducation, setSelectedEducation] = useState(null);
    const [education, setEducation] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await DataService.getEducation();
                setEducation(data || []);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="text-center my-5"><Spinner animation="border" /></div>;

    return (
        <section className="py-5" id="education">
            <Container>
                <h2 className="text-center mb-5 text-white">Education</h2>
                <Row xs={1} md={2} className="g-4">
                    {education.map((edu, index) => (
                        <Col key={index}>
                            <Card className="h-100" onClick={() => setSelectedEducation(edu)}>
                                <Card.Body>
                                    <Card.Title>{edu.degree}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        {edu.institution}
                                    </Card.Subtitle>
                                    <Badge bg="secondary">{edu.dates}</Badge>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            <Modal show={!!selectedEducation} onHide={() => setSelectedEducation(null)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{selectedEducation?.degree}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>{selectedEducation?.institution}</h5>
                    <p className="text-muted mb-4">{selectedEducation?.location}</p>
                    <p>{selectedEducation?.description}</p>
                </Modal.Body>
            </Modal>
        </section>
    );
};