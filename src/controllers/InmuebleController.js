ctrl = {}

const DB = require('../lib/DBData');

ctrl.publicInmueble = async (req,res) => {
    let inmEntidad = await DB.getAllInmueblesEntidad(req.params.id);
    let inm = await DB.getInmueble(req.params.id);
    let rep = await DB.getRepresentantesFromInmueble(req.params.id);
    let isInm = (inmEntidad.idInm == req.user.idEntidad)
    if(isInm){
        res.render('postlog/inmueble/inmopriv')
    }
    
    res.render('postlog/inmueble/inmo', {repre: rep, inmo: inm[0], expressFlash: req.flash('success')});
}; 

ctrl.privateInmueble = async (req, res) => {
    let inm = await DB.getInmueble(req.params.id);
    let rep = await DB.getRepresentantesFromInmueble(req.params.id);
    let descNotFound = 0;
    if(req.user.descripcion.length == 0){
        descNotFound = 1;
    }
    // let img = await db.getImagenInmuebleEntidad(req.user.idEntidad);
    res.render('postlog/inmueble/inmopriv', {descNotFound, repre: rep, inmo: inm[0], expressFlash: req.flash('success')});
};

ctrl.publicProyect = async(req,res) => {
    let inm = await DB.getInmueble(req.params.id);
    let rep = await DB.getRepresentantesFromInmueble(req.params.id);
    
    res.render('postlog/proyectos/proyect', {repre: rep, inmo: inm[0]});

}

ctrl.privateProyect = async(req,res) => {
    let inm = await DB.getInmueble(req.params.id);
    let rep = await DB.getRepresentantesFromInmueble(req.params.id);
    
    res.render('postlog/proyectos/proyectopriv', {repre: rep, inmo: inm[0]});

}




module.exports = ctrl;