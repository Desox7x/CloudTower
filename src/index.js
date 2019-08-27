const express = require('express');
const morgan = require('morgan');
const exhandle = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session')
const MySQLStore = require('express-mysql-session')
const passport = require('passport')
const { database } = require('./keys');
const multer = require('multer');
const uuid = require('uuid/v4');

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname));
    }
});
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
    postlogDir: path.join(app.get('views'), 'postlog'),
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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(multer({
    storage,
    dest: path.join(__dirname, 'public/uploads'),
    limits: {fileSize: 10000000},
    fileFilter: (req, file, cb) => {
        const filetype = /jpeg|jpg|png/;
        const mimetype = filetype.test(file.mimetype);
        const extname = filetype.test(path.extname
            (file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: Archivo no soportado");
    }
}).single('image'))


//Variables globales
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    app.locals.Entidad = req.Entidad;
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