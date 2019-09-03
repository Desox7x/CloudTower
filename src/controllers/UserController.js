const DB = require('../lib/DBData')
const ctrl = {}

ctrl.dashboard = (req, res) => {
    res.render('postlog/dashboard');
}

ctrl.contract = (req, res) => {
    res.render('postlog/contract');
}

ctrl.signaturePad = (req, res) => {
    res.render('postlog/signature_pad');
}

ctrl.uploadPOST = async (req, res) => {

    await DB.updateUserImg(req.file.filename, req.user.idEntidad );
    res.redirect('/profile');
};

ctrl.updateUser = async (req, res) => {
    await DB.updateUserInfo(req.body.fullname, req.body.descripcion, req.body.telefono, req.body.direccion, req.user.idEntidad);
    res.redirect('/profile')
    console.log(req.body)
};

module.exports = ctrl;