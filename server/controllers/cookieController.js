const cookieService = require('../services/cookieService');

exports.getCookiePolicy = async (req, res) => {
    try {
        const data = await cookieService.getCookiePolicy();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
