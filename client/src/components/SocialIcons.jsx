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

    return (
        <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
            {socialLinks.map((link, index) => (
                <a
                    key={index}
                    className="text-decoration-none text-white"
                    onClick={link.action === "map" ? onMapClick : undefined}
                    href={link.action !== "map" ? link.url : undefined}
                    target={link.action !== "map" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    style={{
                        fontSize: "1.5rem",
                        cursor: "pointer"
                    }}
                >
                    <i className={`${link.icon}`}></i>
                </a>
            ))}
        </div>

    );
};
