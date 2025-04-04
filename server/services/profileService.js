const profileData = require('..//data/data.json');

exports.getProfileData = async () => {
  return { profile: profileData.profile };
};