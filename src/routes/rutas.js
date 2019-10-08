const express = require('express');
const router = express.Router();
const {requireRole, isLoggedIn} = require('../lib/auth');

const home = require('../controllers/HomeController');
const user = require('../controllers/UserController');
const auth = require('../controllers/AuthController');
const inmueble = require('../controllers/InmuebleController');
const reserva = require('../controllers/ReservaController');

const ClientRole = 1;
const InmobiliariaRole = 2;
const ConstructoraRole = 3;

console.log(ClientRole);


// =========== HOME ================
router.get('/', home.index);
router.get('/about', home.about);
router.get('/contact', home.contact);
router.post('/sendemail', user.sendEmail);
router.get('/profile', isLoggedIn, home.profile);

router.get('/user/:id', isLoggedIn, user.userProfile);
router.get ('/profile/propertylist', isLoggedIn, requireRole(InmobiliariaRole), home.propertyList);
router.get('/profile/reunionlist', isLoggedIn, requireRole(InmobiliariaRole), home.reunionList);

router.get('/search', home.search)


// =========== USER ================
router.get('/dashboard', isLoggedIn, user.dashboard, user.getProperty);
router.get('/dashboardin', user.getProperty);
router.get('/contract', isLoggedIn, requireRole(InmobiliariaRole), user.contract);
//router.get('/contract', user.signaturePad);
router.get('/add_property', requireRole(InmobiliariaRole), user.addProperty);
router.post('/add_property', user.addPropertyPOST);
router.post('/updateInmo', user.updateInmoPOST);
router.post('/upload', user.uploadPOST);
//router.get('/search', user.search);
router.get('/searchResult', user.searchResult);
router.post('/updateuser', user.updateUser);
router.get('/signature_pad', isLoggedIn, user.signaturePad);
router.get('/delete/:id', user.deleteProperty);
router.post('/contract', requireRole(InmobiliariaRole), user.addContractPOST);


// =========== Inmuebles ============

router.get('/inmueble/:id', inmueble.index);

// =========== Reservas ============
router.post('/reservar/:id/add', reserva.add);
router.get('/reservar/:id', reserva.index );

// =========== AUTH =================
router.get('/signup', auth.signup);
router.post('/signup', auth.signupPOST);

router.get('/login', auth.login)
router.post('/login', auth.loginPOST);

router.get('/logout',  auth.logout);

module.exports = router;