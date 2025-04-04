const express = require('express');
const router = express.Router();
const querystring = require('querystring');

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

router.get('/', (req, res) => {
    const q = req.query.q;
    const url = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&${querystring.stringify({ q })}`;
    res.redirect(url);
});

module.exports = router;
