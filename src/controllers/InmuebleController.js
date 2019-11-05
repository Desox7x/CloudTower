ctrl = {}

const DB = require('../lib/DBData');

ctrl.publicInmueble = async (req,res) => {
    
    let inm = await DB.getInmueble(req.params.id);
    let rep = await DB.getRepresentantesFromInmueble(req.params.id);
    
    res.render('postlog/inmueble/inmo', {repre: rep, inmo: inm[0], expressFlash: req.flash('success')});
}; 

ctrl.privateInmueble = async (req, res) => {
    let inm = await DB.getInmueble(req.params.id);
    let rep = await DB.getRepresentantesFromInmueble(req.params.id);
    // let img = await db.getImagenInmuebleEntidad(req.user.idEntidad);
    res.render('postlog/inmueble/inmopriv', {repre: rep, inmo: inm[0], expressFlash: req.flash('success')});
}

module.exports = ctrl;