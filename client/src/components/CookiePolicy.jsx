import { useState, useEffect } from "react";
import { Container, Button, Modal, Form } from "react-bootstrap";
import { DataService } from "../data/dataService";

export const CookiePolicy = () => {
    const [showBanner, setShowBanner] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [cookiePolicy, setCookiePolicy] = useState(null);
    const [cookiePreferences, setCookiePreferences] = useState({
        strictlyNecessary: true, // Always enabled
        analytics: false,
        marketing: false,
        functional: false
    });

    const clearUnapprovedCookies = (preferences) => {
        document.cookie.split(";").forEach((cookie) => {
            const cookieName = cookie.split("=")[0].trim();
            // Remove analytics cookies if analytics is not allowed
            if (
                !preferences.analytics &&
                (cookieName.startsWith("_ga") || cookieName.startsWith("_gid") || cookieName.startsWith("_gat"))
            ) {
                document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            }
            // Remove marketing cookies if marketing is not allowed
            if (
                !preferences.marketing &&
                (cookieName.startsWith("fbp") || cookieName.startsWith("fbc"))
            ) {
                document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            }
        });
    };


    useEffect(() => {
        const fetchCookiePolicy = async () => {
            try {
                const data = await DataService.getCookiePolicy();
                setCookiePolicy(data.cookiePolicy);
            } catch (error) {
                console.error("Failed to load cookie policy", error);
            }
        };

        fetchCookiePolicy();

        const savedPreferences = JSON.parse(localStorage.getItem("cookiePreferences"));
        if (!savedPreferences) {
            setShowBanner(true);
        } else {
            setCookiePreferences(savedPreferences);
            manageTracking(savedPreferences);
        }
    }, []);

    const savePreferences = () => {
        localStorage.setItem("cookiePreferences", JSON.stringify(cookiePreferences));
        setShowBanner(false);
        setShowModal(false);
        manageTracking(cookiePreferences);
        clearUnapprovedCookies(cookiePreferences);
    };

    const acceptAll = () => {
        const updatedPreferences = {
            strictlyNecessary: true,
            analytics: true,
            marketing: true,
            functional: true
        };
        setCookiePreferences(updatedPreferences);
        localStorage.setItem("cookiePreferences", JSON.stringify(updatedPreferences));
        setShowBanner(false);
        setShowModal(false); // Close modal after Accept All
        enableTracking();
    };

    const declineAll = () => {
        const updatedPreferences = {
            strictlyNecessary: true,
            analytics: false,
            marketing: false,
            functional: false
        };
        setCookiePreferences(updatedPreferences);
        localStorage.setItem("cookiePreferences", JSON.stringify(updatedPreferences));
        disableTracking();
        setShowBanner(false);
        setShowModal(false);
        clearUnapprovedCookies(updatedPreferences);
    };

    const revokeConsent = () => {
        localStorage.removeItem("cookiePreferences");
        setShowBanner(true);
        setShowModal(false);
        clearUnapprovedCookies(cookiePreferences);
    };

    const disableTracking = () => {
        window.doNotTrack = true;
        clearUnapprovedCookies(cookiePreferences);
    };

    const enableTracking = () => {
        window.doNotTrack = false;
    };

    const manageTracking = (preferences) => {
        if (!preferences.analytics && !preferences.marketing && !preferences.functional) {
            disableTracking();
        } else {
            enableTracking();
        }
    };

    return (
        <>
            {/* Cookie Banner */}
            {showBanner && (
                <div className="cookie-banner">
                    <Container className="d-flex justify-content-between align-items-center">
                        <p className="mb-0">
                            We use cookies to improve your experience.{" "}
                            <span className="cookie-policy-link" onClick={() => setShowModal(true)}>
                                Manage Preferences
                            </span>
                        </p>
                        <div className="button-group">
                            <Button variant="success" size="sm" onClick={acceptAll}>
                                Accept All
                            </Button>
                            <Button variant="danger" size="sm" onClick={declineAll}>
                                Decline All
                            </Button>
                        </div>
                    </Container>
                </div>
            )}

            {/* Revoke Consent Button (only show if banner is NOT active) */}
            {!showBanner && (
                <div className="revoke-consent" onClick={() => setShowModal(true)}>
                    <i className="bi bi-shield-lock"></i>
                    <span className="revoke-text"> Manage Cookies</span>
                </div>
            )}

            {/* Cookie Policy Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Cookie Preferences</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {cookiePolicy ? (
                        <>
                            <p>{cookiePolicy.description}</p>
                            <Form>
                                <Form.Group controlId="strictlyNecessary">
                                    <Form.Check
                                        type="checkbox"
                                        label={cookiePolicy.categories.strictlyNecessary}
                                        checked
                                        disabled
                                    />
                                </Form.Group>
                                <Form.Group controlId="analytics">
                                    <Form.Check
                                        type="checkbox"
                                        label={cookiePolicy.categories.analytics}
                                        checked={cookiePreferences.analytics}
                                        onChange={() =>
                                            setCookiePreferences((prev) => ({
                                                ...prev,
                                                analytics: !prev.analytics
                                            }))
                                        }
                                    />
                                </Form.Group>
                                <Form.Group controlId="marketing">
                                    <Form.Check
                                        type="checkbox"
                                        label={cookiePolicy.categories.marketing}
                                        checked={cookiePreferences.marketing}
                                        onChange={() =>
                                            setCookiePreferences((prev) => ({
                                                ...prev,
                                                marketing: !prev.marketing
                                            }))
                                        }
                                    />
                                </Form.Group>
                                <Form.Group controlId="functional">
                                    <Form.Check
                                        type="checkbox"
                                        label={cookiePolicy.categories.functional}
                                        checked={cookiePreferences.functional}
                                        onChange={() =>
                                            setCookiePreferences((prev) => ({
                                                ...prev,
                                                functional: !prev.functional
                                            }))
                                        }
                                    />
                                </Form.Group>
                            </Form>
                        </>
                    ) : (
                        "Loading..."
                    )}

                    <div className="mt-4 d-flex justify-content-between">
                        <Button variant="success" onClick={savePreferences}>
                            Save Preferences
                        </Button>
                        <Button variant="primary" className="me-2" onClick={acceptAll}>
                            Accept All
                        </Button>
                        <Button variant="secondary" onClick={declineAll}>
                            Decline All
                        </Button>
                        <Button variant="warning" onClick={revokeConsent}>
                            Reset Cookie Preferences
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};
