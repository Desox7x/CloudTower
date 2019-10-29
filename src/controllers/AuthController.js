const passport = require('passport');
const DB = require('../lib/DBData')
const helpers = require('../lib/helpers')

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

ctrl.signupRepPOST = async (req, res) => {
    let password = await helpers.encryptPassword(req.body.password)
    await DB.createRep(req.body.fullname, password, req.body.telefono,
        req.body.correo, req.body.direccion, 4, req.user.idEntidad);
    res.redirect('/profile/representantes')
};

module.exports = ctrl;