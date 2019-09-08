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

ctrl.addProperty = (req, res) => {
    res.render('postlog/add_property');
}

ctrl.uploadPOST = async (req, res) => {

    await DB.updateUserImg(req.file.filename, req.user.idEntidad );
    res.redirect('/profile');
};

module.exports = ctrl;