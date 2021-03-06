ctrl = {}
const mailer = require('../lib/mailer')
const DB = require('../lib/DBData');

ctrl.index = async (req, res) => {
    let inm = await DB.getInmueble(req.params.id);
    res.render('postlog/reserva/schedule', {
        inmo: inm[0],
        flash: req.flash("Message")
    });
}

ctrl.add = async (req, res) => {

    let fecha = req.body.fecha;
    let tiempo = req.body.tiempo;
    let idInm = req.params.id;
    let idEntidad = req.user.idEntidad;

    var reqfecha = new Date(fecha);
    var today = new Date();
    today.setHours(0,0,0,0);

    if(reqfecha <= today){
        req.flash('message', 'No puedes reservar en esta fecha.');
        res.redirect('/propiedad/'+req.params.id);
        return;
    }
    

    
    let data = await DB.addReunion(fecha, tiempo, idInm, idEntidad);
    
    if(data == 1){
        await mailer.successReserva(idEntidad);
        req.flash('success', 'Has reservado este inmueble exitosamente!');
    }else{
        req.flash('message', 'No puedes reservar este inmueble. Es posible que el inmueble ya este reservado.');
    }

    

    res.redirect('/propiedad/'+req.params.id);
}

ctrl.deleteReunion = async (req, res) => {
    await DB.deleteReunion(req.params.id);
    console.log(req.params)
    res.redirect('back');
    req.flash('message', 'Ha sido eliminado satisfactoriamente')
}

module.exports = ctrl;