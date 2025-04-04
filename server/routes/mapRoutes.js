const express = require('express');
const router = express.Router();
const querystring = require('querystring');

router.get('/', (req, res) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const q = req.query.q;
    const url = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&${querystring.stringify({ q })}`;
    res.redirect(url);
});

module.exports = router;
