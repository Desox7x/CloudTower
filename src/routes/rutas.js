const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('./layouts/inicio')
});
router.get('/about', (req, res) => {
    res.render('./layouts/about');
});

module.exports = router;