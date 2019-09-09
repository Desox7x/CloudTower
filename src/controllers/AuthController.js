const passport = require('passport');
const DB = require('../lib/DBData')

const ctrl = {}

ctrl.signup =  (req, res) => {
    res.render('auth/signup')
};

ctrl.login = (req, res) => {
    res.render('auth/login');
}
ctrl.logout = (req, res) => {
    req.logOut();
    res.redirect('/login');
};


// ==================== POST =======================
ctrl.signupPOST =  passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
});

ctrl.loginPOST = (req, res, next) => {
    passport.authenticate('local.login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
};

module.exports = ctrl;