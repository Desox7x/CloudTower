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

ctrl.adminLogin = (req, res) => {
    res.render('auth/adminlogin');
}


// ==================== POST =======================
ctrl.signupPOST = passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
});

ctrl.validarPOST = async (req, res) => {
    let password = await helpers.encryptPassword(req.body.password);
    let register = await DB.createUser(req.body.fullname, password, req.body.telefono,
        req.body.correo, req.body.direccion, 2);
    if(register==0){
        req.flash('success', 'Verificacion exitosa')
    }else{
        req.flash('message', 'La verificación no ha podido realizarse.')
    }
    
    

    res.redirect('/admin/solicitudes');
}
    



ctrl.loginPOST = (req, res, next) => {
    passport.authenticate('local.login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
};

ctrl.loginAdminPOST = (req, res, next) => {
    passport.authenticate('local.login', {
        successRedirect: '/admin/solicitudes',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
};

// ctrl.signupClient = async (req, res) => {
//     let password = await helpers.encryptPassword(req.body.password);
//     let check = await DB.createClient(req.body.fullname, password, req.body.telefono, 
//         req.body.correo, req.body.direccion, 1);
//     if(check == 1){
//         req.flash('success', 'Tu cuenta ha sido creada exitosamente! Favor de iniciar sesión para verificar.')
//         console.log('success')
//     } else {
//         req.flash('message', 'Datos duplicados');
//     }
//     res.redirect('/profile');
// }

ctrl.signupRepPOST = async (req, res) => {
    let password = await helpers.encryptPassword(req.body.password)
    await DB.createRep(req.body.fullname, password, req.body.telefono,
        req.body.correo, req.body.direccion, 4, req.user.idEntidad);
    res.redirect('/profile/representantes')
};
ctrl.signupIngPOST = async (req, res) => {
    let password = await helpers.encryptPassword(req.body.password)
    await DB.createRep(req.body.fullname, password, req.body.telefono,
        req.body.correo, req.body.direccion, 4, req.user.idEntidad);
    res.redirect('/profile/ingenieros')
};

ctrl.VerUser = async (req, res) => {
    
    let data = await DB.verifyUser(req.body.fullname, req.body.password, req.body.telefono,
         req.body.correo, req.body.direccion);
    if(data == 1){
        req.flash('success', 'Solicitud enviada')
    }else{
        req.flash('message', 'duplicado');
    }
    res.redirect('/signup');
}

module.exports = ctrl;