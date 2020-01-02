const passport = require('passport');
const DB = require('../lib/DBData')
const helpers = require('../lib/helpers')

const ctrl = {}

ctrl.admin = async (req, res) => {
    let tc = await DB.getTotalTipoEntidad(1);
    let ti = await DB.getTotalTipoEntidad(2);
    let tcons = await DB.getTotalTipoEntidad(3);
    let tr = await DB.getTotalTipoEntidad(4)
    let users = await DB.getAllUsers();
    let inmuebles = await DB.getAllInmuebles();
    res.render('./postlog/admin/admin', {TC: tc.length, 
        TI: ti.length, TCONS: tcons.length, TR: tr.length, users, inmuebles});
}

ctrl.adminClientes = async (req, res) => {
    let cl = await DB.getTotalTipoEntidad(1);
    res.render('./postlog/admin/admincl', {cliente: cl});
}

ctrl.adminInmobiliarias = async (req, res) => {
    let inm = await DB.getTotalTipoEntidad(2);
    res.render('./postlog/admin/adminInmo', {inmo: inm});
}

ctrl.adminConstructora = async (req, res) => {
    let con = await DB.getTotalTipoEntidad(3);
    res.render('./postlog/admin/adminCons', {cons: con});
}

ctrl.adminSolicitudes = async (req, res) => {
    let ver = await DB.getSolicitudes();
    res.render('./postlog/admin/adminreq', {verify: ver});
}



ctrl.deleteVer = async (req, res) => {
    await DB.deleteVerify(req.params.id);
    res.redirect('/admin');
}

ctrl.deleteUser = async (req, res) => {
    await DB.deleteUser(req.params.id);
    res.redirect('/admin');
}

module.exports = ctrl;