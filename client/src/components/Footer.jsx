import { Container, Row, Col } from "react-bootstrap";

export const Footer = () => {
    return (
        <footer className="footer bg-dark text-white py-3">
            <Container>
                <Row className="justify-content-between">
                    <Col xs={12} md={6} className="text-center text-md-start">
                        <p className="mb-0">© {new Date().getFullYear()} Alexandru Nicolae Popa. All rights reserved.</p>
                    </Col>
                    <Col xs={12} md={6} className="text-center text-md-end">
                        <a href="#top" className="text-white text-decoration-none">
                            Back to Top
                        </a>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};
