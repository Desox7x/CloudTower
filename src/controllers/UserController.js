const DB = require('../lib/DBData')
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