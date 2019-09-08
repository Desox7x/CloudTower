const express = require('express');
const router = express.Router();

const home = require('../controllers/HomeController');
const user = require('../controllers/UserController');
const auth = require('../controllers/AuthController');


// =========== HOME ================
router.get('/', home.index);
router.get('/about', home.about);
router.get('/contact', home.contact);
router.get('/profile', home.profile);


// =========== USER ================
router.get('/dashboard', user.dashboard);
router.get('/contract', user.contract);
router.get('/contract', user.signaturePad);
router.get('/add_property', user.addProperty);
router.post('/upload', user.uploadPOST);
router.get('/signature_pad', user.signaturePad);


// =========== AUTH =================
router.get('/signup', auth.signup);
router.post('/signup', auth.signupPOST);

router.get('/login', auth.login)
router.post('/login', auth.loginPOST);

router.get('/logout', auth.logout);

module.exports = router;