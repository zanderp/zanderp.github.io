import { useState, useEffect } from 'react';
import { Modal, Carousel } from 'react-bootstrap';
import { DataService } from '../data/dataService';

export const CertificationBadge = () => {
    const [certifications, setCertifications] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await DataService.getProfile();
                setCertifications(profileData.profile?.certifications || []);
            } catch (error) {
                console.error('Error fetching certifications:', error);
            }
        };
        fetchProfile();
    }, []);

    if (certifications.length === 0) return null;

    const handleImageClick = (index) => {
        setActiveIndex(index);
        setShowModal(true);
    };

    return (
        <div className="certification-section py-4" id="certifications">
            <h3 className="text-center mb-4">Certifications</h3>

            {/* Main page carousel for displaying certifications */}
            <Carousel interval={null} indicators={true} className="certification-carousel">
                {certifications.map((cert, index) => (
                    <Carousel.Item key={index}>
                        <div className="d-flex align-items-center justify-content-between">
                            <img
                                src={`/assets/${cert.image}`}
                                alt={cert.title}
                                className="img-fluid certification-image"
                                onClick={() => handleImageClick(index)}
                            />
                            <div className="ms-3 w-50">
                                <h5 className="mb-0">Professional Certification</h5>
                                <a
                                    href={cert.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-dark"
                                >
                                    {cert.title} <i className="bi bi-box-arrow-up-right"></i>
                                </a>
                            </div>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>

            {/* Modal for image-only carousel */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Certification Images</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel activeIndex={activeIndex} indicators={true} onSelect={(selectedIndex) => setActiveIndex(selectedIndex)}>
                        {certifications.map((cert, index) => (
                            <Carousel.Item key={index}>
                                <div className="text-center">
                                    <img
                                        src={`/assets/${cert.image}`}
                                        alt={cert.title}
                                        className="img-fluid modal-certification-image"
                                    />
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Modal.Body>
            </Modal>
        </div>
    );
};
