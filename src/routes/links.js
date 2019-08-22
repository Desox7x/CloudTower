const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/dashboard', (req, res) => {
    res.render('postlog/dashboard');
});
router.get('/contract', (req, res) => {
    res.render('postlog/contract');
});


module.exports = router;