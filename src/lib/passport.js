const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

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
   const rows = await pool.query('SELECT * FROM Entidad Where idEntidad = ?', [idEntidad]);
   done(null, rows[0]);
})