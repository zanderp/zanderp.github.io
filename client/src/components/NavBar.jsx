import { Navbar, Nav, Container } from "react-bootstrap";

export const FancyNavbar = () => {
    return (
        <Navbar expand="lg" className="navbar-dark bg-dark sticky-top py-3">
            <Container>
                <Navbar.Brand href="#top" className="fw-bold">
                    Alexandru Nicolae Popa
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="#about" className="nav-item">
                            About
                        </Nav.Link>
                        <Nav.Link href="#skills" className="nav-item">
                            Skills
                        </Nav.Link>
                        <Nav.Link href="#certifications" className="nav-item">
                            Certifications
                        </Nav.Link>
                        <Nav.Link href="#experience" className="nav-item">
                            Experience
                        </Nav.Link>
                        <Nav.Link href="#education" className="nav-item">
                            Education
                        </Nav.Link>
                        <Nav.Link href="#contact" className="nav-item">
                            Contact
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
