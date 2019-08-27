const express = require('express');
const router = express.Router();
const pool = require('../database')

const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');



router.get('/signup', (req, res) => {
    res.render('auth/signup')
});

router.post('/signup', passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
}));
router.get('/login', (req, res) => {
    res.render('auth/login');
})
router.post('/login', (req, res, next) => {
    passport.authenticate('local.login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
})
router.get('/profile', (req, res) => {
    res.render('postlog/profile');
});
router.post('/upload', (req, res) => {
    console.log(req.file);
    //pool.query("INSERT INTO Entidad(imgs) VALUES('" + req.file.filename + "')");
    res.render('postlog/profile', {
        
        file: `uploads/${req.file.filename}`
    });
})

module.exports = router;