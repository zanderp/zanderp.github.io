import { useEffect, useState } from "react";
import { DataService } from "../data/dataService";

export const TrackingManager = () => {
    const [cookiePreferences, setCookiePreferences] = useState({
        analytics: false,
        marketing: false,
        functional: false
    });

    useEffect(() => {
        const savedPreferences = JSON.parse(localStorage.getItem("cookiePreferences"));
        if (savedPreferences) {
            setCookiePreferences(savedPreferences);
            loadTrackingScripts(savedPreferences);
        }
    }, []);

    const loadTrackingScripts = (preferences) => {
        DataService.getTrackingScripts().then((trackingScripts) => {
            trackingScripts.forEach(script => {
                if ((script.category === "analytics" && preferences.analytics) ||
                    (script.category === "marketing" && preferences.marketing) ||
                    (script.category === "functional" && preferences.functional)) {

                    const scriptElement = document.createElement("script");
                    scriptElement.src = script.src;
                    scriptElement.async = true;
                    document.body.appendChild(scriptElement);
                }
            });
        });
    };

    return null; // This component doesn't render anything, it just loads scripts
};
