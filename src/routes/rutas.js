const express = require('express');
const router = express.Router();
const {requireRole, isLoggedIn} = require('../lib/auth');

const home = require('../controllers/HomeController');
const user = require('../controllers/UserController');
const auth = require('../controllers/AuthController');

const ClientRole = 1;
const InmobiliariaRole = 2;
const ConstructoraRole = 3;

console.log(ClientRole);


// =========== HOME ================
router.get('/', home.index);
router.get('/about', home.about);
router.get('/contact', home.contact);
router.get('/profile', isLoggedIn, home.profile);


// =========== USER ================
router.get('/dashboard', isLoggedIn, user.dashboard);
router.get('/contract', user.contract);
// router.get('/contract', user.signaturePad);
router.post('/upload', user.uploadPOST);
router.post('/updateuser', user.updateUser);
router.get('/signature_pad', isLoggedIn, user.signaturePad);


router.get('/lmao', requireRole(ClientRole), user.inmobiliariaOnly)


// =========== AUTH =================
router.get('/signup', auth.signup);
router.post('/signup', auth.signupPOST);

router.get('/login', auth.login)
router.post('/login', auth.loginPOST);

router.get('/logout',  auth.logout);

module.exports = router;