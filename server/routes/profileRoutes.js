const express = require('express');
const profileController = require('../controllers/profileController');

const router = express.Router();

router.get('/', profileController.getProfileData);

module.exports = router;