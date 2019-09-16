//const express = require('express');
const db = require('../lib/DBData');
const ctrl = {}



ctrl.index = (req, res) => {
    db.getUserById(2);
 res.render('inicio', );
}

ctrl.about =  (req, res) => {
    res.render('./layouts/about');
}

ctrl.contact = (req, res) => {
    res.render('./postlog/contact');
}

ctrl.profile = (req, res) => {

    if (req.user.idTipoEntidad == 1) {
        return res.render('postlog/profile');
    }
    if (req.user.idTipoEntidad == 2) {
        return res.render('postlog/contact');
    }
    if (req.user.idTipoEntidad == 3) {
        return res.render('postlog/dashboard/constructora');
    }

    res.status(403).send('Forbideen');
}

module.exports = ctrl;