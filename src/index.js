const express = require('express');
const morgan = require('morgan');
const exhandle = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session')
const MySQLStore = require('express-mysql-session')
const passport = require('passport')
const { database } = require('./keys');
//Iniciar
const app = express();
require('./lib/passport');

//Configuracion
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exhandle({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(session({
    secret: 'cloudtowersession',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}))
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


//Variables globales
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    next();
});

//Rutas
app.use(require('./routes/rutas.js'))
app.use(require('./routes/authentication.js'))
app.use(require('./routes/links.js'))

//Public
app.use(express.static(path.join(__dirname, 'public')));

//Iniciar Server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})