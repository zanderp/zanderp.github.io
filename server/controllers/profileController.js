const profileService = require('../services/profileService');

exports.getProfileData = async (req, res) => {
  try {
    const profileData = await profileService.getProfileData();
    res.json(profileData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};