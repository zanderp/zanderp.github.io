import { useState } from "react";
import { Container } from 'react-bootstrap';
import { Header } from './components/Header';
import { WorkExperience } from './components/WorkExperience';
import { CertificationBadge } from './components/CertificationBadge';
import { Education } from './components/Education';
import { AboutMe } from './components/AboutMe';
import { Skills } from './components/Skills';
import { ContactSection } from './components/Contact';
import { Footer } from "./components/Footer";
import { FancyNavbar } from "./components/NavBar";
import { CookiePolicy } from "./components/CookiePolicy";


export const App = () => {
    const [showMap, setShowMap] = useState(false);
    return (
        <>
            <CookiePolicy />
            <FancyNavbar />
            <Container fluid style={{ backgroundColor: '#343a40' }}>
                <Header showMap={showMap} setShowMap={setShowMap} />
                <AboutMe />
                <Skills />
                <CertificationBadge />
                <WorkExperience />
                <Education />
                <ContactSection setShowMap={setShowMap} />
            </Container >
            <Footer />
        </>
    );
};

export default App;