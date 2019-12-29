const passport = require('passport');
const DB = require('../lib/DBData')
const helpers = require('../lib/helpers')

const ctrl = {}

ctrl.admin = (req, res) => {
    res.render('./postlog/admin/admin');
}

ctrl.adminSolicitudes = async (req, res) => {
    let ver = await DB.getSolicitudes();
    res.render('./postlog/admin/adminreq', {verify: ver});
}



ctrl.deleteVer = async (req, res) => {
    await DB.deleteVerify(req.params.id);
    res.redirect('/admin');
}

module.exports = ctrl;