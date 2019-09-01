const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

const DB = require('../lib/DBData');

passport.use('local.login', new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'password',
    passReqToCallback: true

}, async(req, correo, password, done) => {
    console.log(req.body);
    console.log(correo);
    console.log(password);
    const rows = await pool.query('SELECT * FROM Entidad WHERE correo = ?', [correo]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password)
        if (validPassword) {
            done(null, user, req.flash('success', 'Bienvenido! ' + user.fullname));
        } else {
            done(null, false, req.flash('message', 'Contrasena incorrecta'));
        }
    } else {
        return done(null, false, req.flash('message', 'Usuario no existe'));
    }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'fullname',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, fullname, password, done) => {
    const { telefono, correo, direccion } = req.body;
    const newUser = {
        fullname,
        password,
        telefono,
        correo,
        direccion
    };
    newUser.password = await helpers.encryptPassword(password)
    const result = await pool.query('INSERT INTO Entidad SET ?', [newUser]);
    
    console.log(result);
    newUser.idEntidad = result.insertId;
    return done(null, newUser);
}));
passport.serializeUser((Entidad, done) => {
    done(null, Entidad.idEntidad);
});

passport.deserializeUser(async (idEntidad, done) => {
   //const rows = await pool.query('SELECT * FROM Entidad Where idEntidad = ?', [idEntidad]);
   const rows = await DB.getUserById(idEntidad)
   done(null, rows[0]);
})
