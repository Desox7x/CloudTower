const DB = require('../lib/DBData')
const pool = require('../database');
const mailer = require('../lib/mailer');
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

ctrl.legalDocs = (req, res) => {
    res.render('postlog/legalDocs');
}

ctrl.signaturePad = (req, res) => {
    res.render('postlog/signature_pad');
}

ctrl.addProperty = (req, res) => {
    res.render('postlog/add_property');
}
ctrl.inmueble = (req, res) => {
    res.render('postlog/inmueble');
};
ctrl.scheduleReunion = (req, res) => {
    res.render('postlog/schedulePage');
}



ctrl.addPropertyPOST = async (req, res) => {
    const validate = await DB.repBelongInmobiliaria(req.body.idRep, req.user.idEntidad)
    if (validate) {
        const nuevo = await DB.addInmueble(req.body.nombre, req.body.estado, req.body.descr, req.body.ubic, req.body.municipio, 
            req.body.tipoInm, req.body.compra, req.body.img, req.body.moneda, req.body.precio, req.body.metro,
            req.body.hab, req.body.bano, req.body.parqueo, req.body.lBlanca, req.body.amueblado, req.user.idEntidad);
        await DB.getRepresentantesEntidad(req.user.idEntidad);
        await DB.addRepInmueble(req.body.idRep, nuevo.insertId);
        

        // req.file.filename.forEach(async img => {
        //      await DB.addImagesInmueble(img, nuevo.insertId);
        //  });

        console.log(req.body);
        res.redirect('/profile');
    } else {
        res.flash("Error");

    }

}

ctrl.addPropertyCPOST = async (req, res) => {
    await DB.addInmueble(req.body.nombre, req.body.descr, req.body.ubic, req.body.tipoInm,
        req.body.img, req.body.compra, req.body.moneda, req.body.precio, req.body.metro,
        req.body.hab, req.body.bano, req.body.parqueo, req.body.lBlanca, req.body.amueblado,
        req.user.idEntidad, req.body.estado);
    await DB.getRepresentantesEntidad(req.user.idEntidad);
    await DB.addRepInmueble(req.body.idRep, nuevo.insertId);
    
    
    console.log(req.body);
    res.redirect('/profile');
}

ctrl.updateInmoPOST = async (req, res) => {
    await DB.updateInmo(req.body.nombre, req.body.estado, req.body.descr, req.body.precio,
        req.body.moneda, req.body.compra, req.params.id);
    res.redirect('/profile/propertyList');
    console.log(req.body);
}

ctrl.updateUser = async (req, res) => {
    await DB.updateUserInfo(req.body.fullname, req.body.descripcion, req.body.telefono, req.body.direccion, req.body.Empleo, req.user.idEntidad);
    res.redirect('/profile')
    console.log(req.body)
}

ctrl.addContractPOST = async (req, res) => {
    await DB.addContract(req.body.dir, req.body.typeP, req.body.dateCon, req.body.price,
        req.body.cur, req.body.nameC, req.body.mailC, req.body.telC, req.body.nameR,
        req.body.mailR, req.body.telR);
    console.log(req.body);
    res.redirect('/profile');
}

ctrl.getProperty = async (req, res) => {
    const inmueble = await DB.getAllInmuebles();

    const totalInmuebles = await DB.getTotalInmuebles();
    
    
    console.log(inmueble);
    res.render('postlog/dashboard/cliente', { totalInmuebles: inmueble.length, inmuebles: inmueble, ti:totalInmuebles })
}

ctrl.deleteProperty = async (req, res) => {
    let data = await DB.deleteProperty(req.params.id);
    if(data==1){
        req.flash('success', 'Inmueble eliminado exitosamente!')
    }else{
        req.flash('message', 'No se puede eliminar un inmueble con citas pendientes, elimine las citas o espere a que estas se realicen.')
    }
    console.log(req.params);
    res.redirect('/profile/propertylist');
}
ctrl.deleteProyect = async (req, res) => {
    await DB.deleteProperty(req.params.id);
    res.redirect('/profile/proyectlist');
    
}

ctrl.search = (req, res) => {
    res.render('postlog/search');
};

ctrl.sendEmail = async (req, res) => {
    mailer.contacto('lalala', 'lalalala')
    console.log('Message sent', info.messageId);

    res.send('recibido');
}

ctrl.searchResult = (req, res) => {
    res.render('postlog/searchResult');
}

ctrl.uploadPOST = async (req, res) => {

    await DB.updateUserImg(req.file.filename, req.user.idEntidad);
    res.redirect('/profile');
};
ctrl.editProfile = (req, res) => {
    return res.render("postlog/editProfile", {data: req.user});
}


ctrl.userProfile = async (req, res) => {
    let user = await DB.getUserById(req.params.id);
    const inmueble = await DB.getAllInmueblesEntidad(req.params.id);
    console.log(user.length);

    if (user.length > 0) {
        console.log("a");
        let isUser = (user[0].idEntidad == req.user.idEntidad);
        if (isUser) {
            return res.redirect('/profile')
        }

        if (user[0].idTipoEntidad == 2) {

            return res.render('postlog/publicinmo', { data: user[0], inmuebles: inmueble })
        }

        if (user[0].idTipoEntidad == 3) {

            return res.render('postlog/publiccons', { data: user[0], inmuebles: inmueble })
        }

        return res.render('postlog/profile', { data: user[0], isUser });
    }

    return res.status(404).send('Not Found');
}

module.exports = ctrl;