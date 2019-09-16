const DB = require('../lib/DBData')
const pool = require('../database');
const ctrl = {}

ctrl.dashboard = (req, res) => {

    if (req.user.idTipoEntidad == 1) {
        return res.render('postlog/dashboard/cliente');
    }
    if (req.user.idTipoEntidad == 2) {
        return res.render('postlog/dashboard/inmobiliaria');
    }
    if (req.user.idTipoEntidad == 3) {
        return res.render('postlog/dashboard/constructora');
    }

    res.status(403).send('Forbideen');
}


ctrl.inmobiliariaOnly = (req, res) => {
    // if(req.user.idTipoEntidad == 2){
    //     return res.send('AYEE');
    // }
    // res.status(403).send('Forbidden');
    return res.send('AYEE');
}

ctrl.contract = (req, res) => {
    res.render('postlog/contract');
}

ctrl.signaturePad = (req, res) => {
    res.render('postlog/signature_pad');
}

ctrl.addProperty = (req, res) => {
    res.render('postlog/add_property');
}
ctrl.inmueble = (req, res) => {
    res.render('postlog/inmueble');
}

ctrl.addPropertyPOST = async (req, res) => {
    await DB.addInmueble(req.body.nombre, req.body.descr, req.body.ubic, req.body.tipoInm,
        req.body.img, req.body.compra, req.body.moneda, req.body.precio, req.body.metro, 
        req.body.hab, req.body.bano, req.body.parqueo, req.body.lBlanca, req.body.amueblado);
    console.log(req.body);
    res.redirect('/cliente');
    
}
ctrl.getProperty = async (req, res) => {
    const inmueble = await DB.getAllInmuebles();  
    console.log(inmueble);
    res.render('postlog/dashboard/cliente', {data: inmueble})
}
ctrl.search = (req, res) => {
    res.render('postlog/search');
}

ctrl.searchResult = (req, res) => {
    res.render('postlog/searchResult');
}

ctrl.uploadPOST = async (req, res) => {

    await DB.updateUserImg(req.file.filename, req.user.idEntidad);
    res.redirect('/profile');
};

ctrl.updateUser = async (req, res) => {
    await DB.updateUserInfo(req.body.fullname, req.body.descripcion, req.body.telefono, req.body.direccion, req.user.idEntidad);
    res.redirect('/profile')
    console.log(req.body)
};

module.exports = ctrl;