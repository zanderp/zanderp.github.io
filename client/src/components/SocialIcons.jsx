import { useEffect, useState } from "react";
import { DataService } from "../data/dataService";

export const SocialIcons = ({ onMapClick }) => {
    const [socialLinks, setSocialLinks] = useState([]);

    useEffect(() => {
        const fetchSocialLinks = async () => {
            try {
                const links = await DataService.getSocialLinks();
                setSocialLinks(links);
            } catch (error) {
                console.error("Error fetching social links:", error);
            }
        };
        fetchSocialLinks();
    }, []);

    const handleClick = (link, e) => {
        if (link.action === "map") {
            e.preventDefault();
            onMapClick?.();
        } else if (link.url?.startsWith("mailto:")) {
            e.preventDefault();
            const encoded = btoa(link.url); // Encode to base64
            const decoded = atob(encoded);
            window.location.href = decoded;
        } else if (link.url?.startsWith("tel:")) {
            e.preventDefault();
            const encoded = btoa(link.url);
            const decoded = atob(encoded);
            window.location.href = decoded;
        }
    };

    return (
        <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
            {socialLinks.map((link, index) => (
                <a
                    key={index}
                    className="text-decoration-none text-white"
                    onClick={(e) => handleClick(link, e)}
                    href={
                        link.action === "map"
                            ? undefined
                            : link.url?.startsWith("mailto:") || link.url?.startsWith("tel:")
                                ? "#"
                                : link.url
                    }
                    target={
                        link.url?.startsWith("mailto:") || link.url?.startsWith("tel:") ? undefined : "_blank"
                    }
                    rel="noopener noreferrer"
                    style={{
                        fontSize: "1.5rem",
                        cursor: "pointer"
                    }}
                    title={link.label}
                >
                    <i className={`${link.icon}`}></i>
                </a>
            ))}
        </div>
    );
};
