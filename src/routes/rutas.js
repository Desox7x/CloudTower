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
router.get('/mapa', home.map)
router.get('/user/:id', isLoggedIn, user.userProfile);
router.get ('/profile/propertylist', isLoggedIn, requireRole(InmobiliariaRole), home.propertyList);
router.get('/profile/proyectlist', isLoggedIn, requireRole(ConstructoraRole), home.proyectList);
router.get('/profile/reunionlist', isLoggedIn, requireRole(InmobiliariaRole), home.reunionList);
router.get('/profile/datelist', isLoggedIn, requireRole(ConstructoraRole), home.dateList);
router.get('/profile/representantes', isLoggedIn, requireRole(InmobiliariaRole), home.representantes);
router.get('/profile/ingenieros', isLoggedIn, requireRole(ConstructoraRole), home.ingenieros);
router.get('/search', home.search);
router.get('/buscarInmuebles', home.searchFilter);


// =========== USER ================
router.get('/dashboard', isLoggedIn, user.dashboard, user.getProperty);
router.get('/dashboardin', user.getProperty);
router.get('/contract', isLoggedIn, requireRole(InmobiliariaRole), user.contract);
router.get('/contrato', isLoggedIn, requireRole(ConstructoraRole), user.contract);
//router.get('/contract', user.signaturePad);
router.get('/add_property', requireRole(InmobiliariaRole), user.addProperty);
router.post('/add_property', user.addPropertyPOST);
router.post('/updateInmo', user.updateInmoPOST);
router.post('/upload', user.uploadPOST);
//router.get('/search', user.search);
router.get('/searchResult', user.searchResult);
router.post('/updateuser', user.updateUser);
router.get('/editProfile', user.editProfile);
router.get('/signature_pad', isLoggedIn, user.signaturePad);
router.get('/delete/:id', user.deleteProperty);
router.get('/deleteProyect/:id', user.deleteProyect);
router.post('/contract', user.addContractPOST);
router.get('/schedule', user.scheduleReunion);
router.post('/add_property', user.addPropertyCPOST);


// =========== Inmuebles ============
router.get('/profile/inmueble/:id', inmueble.privateInmueble);
router.get('/inmueble/:id', inmueble.publicInmueble);

// =========== Proyectos ============
router.get('/profile/proyectos/:id', inmueble.privateProyect);
router.get('/proyectos/:id', inmueble.publicProyect);
// =========== Reservas ============
router.post('/reservar/:id/add', reserva.add);
router.get('/reservar/:id', reserva.index );
router.get('/borrar/:id', reserva.deleteReunion);

// =========== AUTH =================
router.get('/signup', auth.signup);
router.post('/signup', auth.signupPOST);
router.post('/signuprep', auth.signupRepPOST);
router.post('/signuping', auth.signupIngPOST);

router.get('/login', auth.login)
router.post('/login', auth.loginPOST);

router.get('/logout',  auth.logout);



module.exports = router;