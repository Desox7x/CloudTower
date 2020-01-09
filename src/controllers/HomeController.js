//const express = require('express');
const db = require('../lib/DBData');
const ctrl = {}



ctrl.index = (req, res) => {
    db.getUserById(2);
 res.render('inicio', );
}

ctrl.about = (req, res) => {
    res.render('./layouts/about');
}

ctrl.contact = (req, res) => {
    
    res.render('./postlog/contact');
}

ctrl.map = (req, res) => {
    res.render('./postlog/mapa')
}
ctrl.profile = async (req, res) => {
    let noReservas;
    if (req.user.idTipoEntidad == 1 || req.user.idTipoEntidad == 4 || req.user.idTipoEntidad == 5) {
        const reunion = await db.getUserReunion(req.user.idEntidad)
        reunion.forEach(element => {
            element.fecha = element.fecha.toLocaleDateString()
            console.log(element.fecha)
        });
        
        return res.render('postlog/profile', {reserva: reunion, data: req.user, isUser: true, noReservas});
    }
    if (req.user.idTipoEntidad == 2) {
        const rep = await db.getRepresentantesEntidad(req.user.idEntidad);
        const reuniones = await db.getReunionesEntidad(req.user.idEntidad);
        console.log('id'+req.user.idEntidad,reuniones);
        const inmueble = await db.getAllInmueblesEntidad(req.user.idEntidad); 
        const reservas = await db.getAllReunionesEntidad(req.user.idEntidad);
        
        return res.render('postlog/inmoprofile', {repre: rep, inmuebles: inmueble, totalReuniones: reuniones.length, totalReservas: reservas.length});
    }
    if (req.user.idTipoEntidad == 3) {
        const reuniones = await db.getReunionesEntidad(req.user.idEntidad);
        console.log('id'+req.user.idEntidad,reuniones);
        const inmueble = await db.getAllInmueblesEntidad(req.user.idEntidad);
        const rep = await db.getRepresentantesEntidad(req.user.idEntidad); 
        return res.render('postlog/constructprofile', {repre: rep, inmuebles: inmueble, totalReuniones: reuniones.length});
    }
    

    res.status(403).send('Forbideen');
}


ctrl.propertyList = async (req, res) => {
    const inmueble = await db.getAllInmueblesEntidad(req.user.idEntidad); 
    const rep = await db.getRepresentantesEntidad(req.user.idEntidad);
    // const img = await db.getImagenInmuebleEntidad(req.user.idEntidad);
    res.render('postlog/propertyList', {repre: rep, inmuebles: inmueble});
};
ctrl.proyectList = async (req, res) => {
    const inmueble = await db.getAllInmueblesEntidad(req.user.idEntidad); 
    const rep = await db.getRepresentantesEntidad(req.user.idEntidad);
    // const img = await db.getImagenInmuebleEntidad(req.user.idEntidad);
    res.render('postlog/proyectList', {repre: rep, inmuebles: inmueble});
};


ctrl.reunionList = async (req, res) => {
    const reuniones = await db.getAllReunionesEntidad(req.user.idEntidad);
    const rep = await db.getRepresentantesEntidad(req.user.idEntidad);
    reuniones.forEach(element => {
        element.fecha = element.fecha.toLocaleDateString()
        console.log(element.fecha)
    });
    res.render('postlog/reunionList', {repre: rep, reunion: reuniones});
}
ctrl.dateList = async (req, res) => {
    const reuniones = await db.getAllReunionesEntidad(req.user.idEntidad);
    const rep = await db.getRepresentantesEntidad(req.user.idEntidad);
    reuniones.forEach(element => {
        element.fecha = element.fecha.toLocaleDateString()
        console.log(element.fecha)
    });
    res.render('postlog/datelist', {repre: rep, reunion: reuniones});
}
ctrl.representantes = async (req, res) => {
    const rep = await db.getRepresentantesEntidad(req.user.idEntidad);
    res.render('postlog/representantes', {repre: rep});
}
ctrl.ingenieros = async (req, res) => {
    const rep = await db.getRepresentantesEntidad(req.user.idEntidad);
    res.render('postlog/ingenieros', {repre: rep});
}

ctrl.search = async(req,res) => {
    let data, rep;
    let check = 0;
    let notFound = 0;
    if(req.query.nombre != undefined) {
         data = await db.searchUser(req.query.nombre);
         rep = await db.getRepresentantesFromInmueble(req.params.id);
    }else{
        notFound = 1;

    }

    
    // if(data == 0){
    //     console.log('no hay na');
    //     req.flash('message', 'lalalalal')
    // }
    
    return res.render('postlog/search', {rep, data, check, notFound})

}



ctrl.searchFilter = async(req, res) => {
    let data;
    let notFound = 0;
    if(req.query.nombre != undefined || req.query.ubic != undefined || req.query.tipoInm != undefined || 
        req.query.estado != undefined || req.query.compra != undefined) {
            data = await db.searchFilter(req.query.nombre, req.query.ubic, req.query.tipoInm, 
                req.query.estado, req.query.compra);
         } else {
             notFound = 1;
         }
    // let data = await db.searchFilter(req.query.nombre, req.query.ubic, req.query.tipoInm,
    //     req.query.estado, req.query.compra);
    return res.render('postlog/searchfilter', {data, notFound})
}

module.exports = ctrl;