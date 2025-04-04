import { useState, useEffect } from 'react';
import { Modal, Card, Row, Col, Spinner, Badge, Container } from 'react-bootstrap';
import { DataService } from '../data/dataService';

export const WorkExperience = () => {
    const [selectedJob, setSelectedJob] = useState(null);
    const [experience, setExperience] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await DataService.getWorkExperience();
                setExperience(data || []);
            } catch (err) {
                setError(err.message || 'Failed to fetch work experience');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <Spinner animation="border" className="d-block mx-auto my-5" />;
    if (error) return <div className="alert alert-danger text-center">{error}</div>;

    return (
        <section className="py-5" id="experience">
            <Container>
                <h2 className="text-center mb-5 text-white">Professional Experience</h2>
                <Row xs={1} md={2} lg={3} className="g-4">
                    {experience.map((job, index) => (
                        <Col key={index}>
                            <Card className="experience-card h-100" onClick={() => setSelectedJob(job)}>
                                <Card.Body>
                                    <Card.Title>{job.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{job.date}</Card.Subtitle>
                                    <div className="mt-3">
                                        {job.technologies.slice(0, 3).map((tech, i) => (
                                            <Badge key={i} bg="secondary" className="me-1">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            <Modal show={!!selectedJob} onHide={() => setSelectedJob(null)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{selectedJob?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-muted mb-4">{selectedJob?.date}</p>

                    {selectedJob && selectedJob?.description && (
                        <>
                            <h5>Description</h5>
                            <p className="mb-4">
                                <i className="bi bi-info-circle text-primary me-2"></i>
                                {selectedJob.description}
                            </p>
                        </>
                    )}

                    {selectedJob && selectedJob?.responsibilities?.length > 0 && (
                        <>
                            <h5>Responsibilities</h5>
                            <ul className="list-unstyled">
                                {selectedJob?.responsibilities.map((resp, i) => (
                                    <li key={i} className="mb-2">
                                        <i className="bi bi-check2-circle text-primary me-2"></i>
                                        {resp}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    {selectedJob && selectedJob?.projects?.length > 0 && (
                        <>
                            <h5 className="mt-4">Key Projects</h5>
                            <div className="d-flex flex-wrap gap-2">
                                {selectedJob?.projects.map((project, i) => (
                                    <a
                                        key={i}
                                        href={`https://${project.toLowerCase().replace(/\s+/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Badge bg="secondary" pill className="text-decoration-none">
                                            {project}
                                        </Badge>
                                    </a>
                                ))}
                            </div>
                        </>
                    )}

                    {selectedJob && selectedJob?.technologies?.length > 0 && (
                        <>
                            <h5 className="mt-4">Technologies</h5>
                            <ul className="list-unstyled">
                                {selectedJob?.technologies.map((ach, i) => (
                                    <li key={i} className="modal-technologies">
                                        {ach}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    {selectedJob && selectedJob?.achievements?.length > 0 && (
                        <>
                            <h5 className="mt-4">Achievements</h5>
                            <ul className="list-unstyled">
                                {selectedJob?.achievements.map((ach, i) => (
                                    <li key={i} className="modal-achievement">
                                        {ach}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </Modal.Body>
            </Modal>
        </section>
    );
};