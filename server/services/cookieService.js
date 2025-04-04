const profileData = require('../data/data.json');

exports.getCookiePolicy = async () => {
    return { cookiePolicy: profileData.cookiePolicy };
};
