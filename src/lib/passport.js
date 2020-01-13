const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

const DB = require('../lib/DBData');

const mailer = require('../lib/mailer');

passport.use('local.login', new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'password',
    passReqToCallback: true

}, async (req, correo, password, done) => {
    console.log(req.body);
    console.log(correo);
    console.log(password);
    const rows = await pool.query('SELECT * FROM Entidad WHERE correo = ?', [correo]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password)
        if (validPassword) {
            done(null, user);
        } else {
            done(null, false, req.flash('message', 'Contraseña incorrecta'));
        }
    } else {
        return done(null, false, req.flash('message', 'Este usuario no existe'));
    }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'fullname',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, fullname, password, done) => {
    const { telefono, correo, direccion, entidad } = req.body;
    console.log(req.body)
    const newUser = {
        fullname,
        password,
        telefono,
        correo,
        direccion,
        idTipoEntidad: entidad
    };
    newUser.password = await helpers.encryptPassword(password)
    
    const check = await pool.query('SELECT * FROM Entidad WHERE telefono = ? OR correo = ?', [telefono, correo]);
    console.log(check);
    if (check.length == 0) {
        const result = await pool.query('INSERT INTO Entidad SET ?', [newUser]);
        console.log(result);
        console.log('resultados')
        newUser.idEntidad = result.insertId;

        await mailer.newuser(newUser.idEntidad);

        return done(null, newUser);
    }else{
        return done(null, false, req.flash('message', 'El Teléfono y/o Correo digitados ya están vinculados a una cuenta'));
    }

}));
passport.serializeUser((Entidad, done) => {
    done(null, Entidad.idEntidad);
});

passport.deserializeUser(async (idEntidad, done) => {
    //const rows = await pool.query('SELECT * FROM Entidad Where idEntidad = ?', [idEntidad]);
    const rows = await DB.getUserById(idEntidad)
    done(null, rows[0]);
})
