const express = require('express');
const router = express.Router();
const a = require('../lib/auth');

const home = require('../controllers/HomeController');
const user = require('../controllers/UserController');
const auth = require('../controllers/AuthController');


// =========== HOME ================
router.get('/', home.index);
router.get('/about', home.about);
router.get('/contact', home.contact);
router.get('/profile', a.isLoggedIn, home.profile);


// =========== USER ================
router.get('/dashboard', a.isLoggedIn, user.dashboard);
router.get('/contract', user.contract);
// router.get('/contract', user.signaturePad);
router.post('/upload', user.uploadPOST);
router.post('/updateuser', user.updateUser);
router.get('/signature_pad', a.isLoggedIn, user.signaturePad);


router.get('/lmao', user.inmobiliariaOnly)


// =========== AUTH =================
router.get('/signup', auth.signup);
router.post('/signup', auth.signupPOST);

router.get('/login', auth.login)
router.post('/login', auth.loginPOST);

router.get('/logout', auth.logout);

module.exports = router;