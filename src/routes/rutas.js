const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('inicio')
});
router.get('/about', (req, res) => {
    res.render('./layouts/about');
});
router.get('/contact', (req, res) => {
    res.render('./postlog/contact');
});

module.exports = router;