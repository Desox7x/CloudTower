const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/dashboard', (req, res) => {
    res.render('postlog/dashboard');
});


module.exports = router;