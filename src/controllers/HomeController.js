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

ctrl.profile = async (req, res) => {
    if (req.user.idTipoEntidad == 1) {
        return res.render('postlog/profile', {data: req.user, isUser: true});
    }
    if (req.user.idTipoEntidad == 2) {
        const inmueble = await db.getAllInmuebles(); 
        return res.render('postlog/inmoprofile', {inmuebles: inmueble});
    }
    if (req.user.idTipoEntidad == 3) {
        return res.render('postlog/dashboard/constructora');
    }

    res.status(403).send('Forbideen');
}
ctrl.propertyList = async (req, res) => {
    const inmueble = await db.getAllInmuebles(); 
    res.render('postlog/propertyList', {inmuebles: inmueble});
}

ctrl.search = async(req,res) => {
    let data = await db.searchInmueble(req.query.nombre);
    
    return res.render('postlog/search', {data})

}

module.exports = ctrl;