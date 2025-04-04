export const DataService = {
    async getProfile() {
        const response = await fetch('https://server.alexandru.rocks/api/profile');
        return response.json();
    },

    async getWorkExperience() {
        const data = await this.getProfile();
        return data.profile.experience;
    },

    async getTopSkills(count = 5) {
        const data = await this.getProfile();
        return [...data.profile.skills]
            .sort((a, b) => b.relevance - a.relevance)
            .slice(0, count);
    },

    async getSkills() {
        const data = await this.getProfile();
        return [...data.profile.skills]
            .sort((a, b) => b.relevance - a.relevance);
    },

    async getEducation() {
        const data = await this.getProfile();
        return data.profile?.education || [];
    },

    async getSocialLinks() {
        const data = await this.getProfile();
        return data.profile?.socialLinks || [];
    },

    async getAboutMe() {
        const data = await this.getProfile();
        return data.profile?.aboutMe || {};
    },

    async getCookiePolicy() {
        const response = await fetch('https://server.alexandru.rocks/api/cookie-policy');
        return response.json();
    }
};