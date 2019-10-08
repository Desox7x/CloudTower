ctrl = {}

const DB = require('../lib/DBData');

ctrl.index = async (req, res) => {
    let inm = await DB.getInmueble(req.params.id);
    res.render('postlog/reserva/schedule', {
        inmo: inm[0]
    });
}

ctrl.add = async (req, res) => {

    let fecha = req.body.fecha;
    let tiempo = req.body.tiempo;
    let idInm = req.params.id;
    let idEntidad = req.user.idEntidad;

    
    let data = await DB.addReunion(fecha, tiempo, idInm, idEntidad);
    // req.flash('success', 'hue');
    res.redirect('/inmueble/'+req.params.id);
}

module.exports = ctrl;